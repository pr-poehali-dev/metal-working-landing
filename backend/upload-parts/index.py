import json
import os
import base64
import io
import psycopg2
import openpyxl


def handler(event: dict, context) -> dict:
    """Загрузка Excel-файла со списком запчастей и сохранение в БД"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    file_b64 = body.get("file")
    if not file_b64:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Файл не передан"})}

    file_bytes = base64.b64decode(file_b64)
    wb = openpyxl.load_workbook(io.BytesIO(file_bytes), data_only=True)
    ws = wb.active

    rows = list(ws.iter_rows(values_only=True))
    if not rows:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Файл пустой"})}

    # Пропускаем заголовочную строку
    data_rows = rows[1:]

    parts = []
    for row in data_rows:
        if not row or all(v is None for v in row):
            continue
        code = str(row[0]).strip() if row[0] is not None else None
        drawing_number = str(row[1]).strip() if len(row) > 1 and row[1] is not None else None
        qty_str = row[2] if len(row) > 2 else None
        try:
            qty = int(qty_str) if qty_str is not None else None
        except (ValueError, TypeError):
            qty = None
        name = str(row[3]).strip() if len(row) > 3 and row[3] is not None else None
        if not name:
            continue
        note = str(row[4]).strip() if len(row) > 4 and row[4] is not None else None
        dimensions = str(row[5]).strip() if len(row) > 5 and row[5] is not None else None
        weight_str = row[6] if len(row) > 6 else None
        try:
            weight = float(weight_str) if weight_str is not None else None
        except (ValueError, TypeError):
            weight = None
        material = str(row[7]).strip() if len(row) > 7 and row[7] is not None else None

        parts.append((code, drawing_number, qty, name, note, dimensions, weight, material))

    if not parts:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Нет данных для импорта"})}

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(f"TRUNCATE TABLE {schema}.parts RESTART IDENTITY")

    for p in parts:
        cur.execute(
            f"""INSERT INTO {schema}.parts
                (code, drawing_number, qty_per_pump, name, note, dimensions, weight_kg, material)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""",
            p
        )

    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "imported": len(parts)}, ensure_ascii=False),
    }
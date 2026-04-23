import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Получение списка запчастей из БД"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(f"""
        SELECT id, code, drawing_number, qty_per_pump, name, dimensions, weight_kg, material
        FROM {schema}.parts
        ORDER BY id
    """)

    rows = cur.fetchall()
    cur.close()
    conn.close()

    parts = [
        {
            "id": r[0],
            "code": r[1],
            "drawing_number": r[2],
            "qty_per_pump": r[3],
            "name": r[4],
            "dimensions": r[5],
            "weight_kg": float(r[6]) if r[6] is not None else None,
            "material": r[7],
        }
        for r in rows
    ]

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"parts": parts}, ensure_ascii=False),
    }

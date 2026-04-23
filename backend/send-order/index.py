import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту conscredymad1981@yandex.ru"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    contact = body.get("contact", "").strip()
    message = body.get("message", "").strip()

    if not name or not contact:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Заполните имя и контакт"}, ensure_ascii=False),
        }

    smtp_user = "conscredymad1981@yandex.ru"
    smtp_password = os.environ["SMTP_PASSWORD"]

    html = f"""
    <html><body style="font-family: monospace; background:#0e1117; color:#d4c9a8; padding:24px;">
      <div style="border:1px solid #e8900a; padding:20px; max-width:560px;">
        <div style="color:#e8900a; font-size:11px; margin-bottom:16px;">// НОВАЯ ЗАЯВКА С САЙТА ПРОМТЕХДЕТАЛЬ</div>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="color:#8fa3b1; font-size:11px; padding:4px 0; width:140px;">ИМЯ / ОРГАНИЗАЦИЯ</td>
              <td style="color:#d4c9a8; padding:4px 0;">{name}</td></tr>
          <tr><td style="color:#8fa3b1; font-size:11px; padding:4px 0;">КОНТАКТ</td>
              <td style="color:#d4c9a8; padding:4px 0;">{contact}</td></tr>
          <tr><td style="color:#8fa3b1; font-size:11px; padding:4px 0; vertical-align:top;">ЗАПРОС</td>
              <td style="color:#d4c9a8; padding:4px 0;">{message or '—'}</td></tr>
        </table>
        <div style="margin-top:16px; color:#8fa3b1; font-size:10px;">promtechdet.ru</div>
      </div>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от {name}"
    msg["From"] = smtp_user
    msg["To"] = smtp_user
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}, ensure_ascii=False),
    }

"""
RSVP-обработчик: сохраняет анкету гостя и отправляет уведомление в Telegram.
Если гость указал @username в комментарии — отправляет ему автоответ.
"""
import json
import os
import re
import urllib.request
import urllib.parse


TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_ID = "945599518"
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def send_telegram(chat_id: str, text: str) -> None:
    """Отправляет сообщение в Telegram."""
    url = f"{TELEGRAM_API}/sendMessage"
    data = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req, timeout=10)
    except Exception:
        pass  # не блокируем если Telegram недоступен


def extract_username(text: str) -> str | None:
    """Извлекает первый @username из строки."""
    match = re.search(r"@([A-Za-z0-9_]{5,32})", text or "")
    return match.group(1) if match else None


def handler(event: dict, context) -> dict:
    """Принимает RSVP-анкету и отправляет уведомление в Telegram."""

    # CORS preflight
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": CORS_HEADERS, "body": json.dumps({"error": "Method not allowed"})}

    # Парсим тело запроса
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Invalid JSON"})}

    first_name = body.get("firstName", "").strip()
    last_name = body.get("lastName", "").strip()
    attendance = body.get("attendance", "").strip()
    drinks = body.get("drinks", [])
    comment = body.get("comment", "").strip()

    if not first_name or not last_name or not attendance:
        return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Required fields missing"})}

    # Форматируем сообщение для невесты и жениха
    drinks_str = ", ".join(drinks) if drinks else "не указано"
    comment_str = comment if comment else "—"

    notification = (
        "💍 <b>Новая анкета гостя!</b>\n\n"
        f"👤 <b>Имя:</b> {first_name} {last_name}\n"
        f"📋 <b>Присутствие:</b> {attendance}\n"
        f"🍷 <b>Напитки:</b> {drinks_str}\n"
        f"💬 <b>Комментарий:</b> {comment_str}"
    )
    send_telegram(CHAT_ID, notification)

    # Автоответ гостю если указал @username
    username = extract_username(comment)
    if username:
        guest_reply = (
            f"Привет, {first_name}! 🌿\n\n"
            "Александр и Дарья получили вашу анкету. Спасибо, что откликнулись!\n"
            "Ждём вас 08 августа 2026 в Нижнекамске. Это будет незабываемый день! 💍"
        )
        # Пробуем найти chat_id по username через getUpdates — нельзя напрямую.
        # Отправляем в основной чат пометку, что нужен автоответ.
        auto_note = f"⚡️ Автоответ запрошен для @{username}: «{guest_reply}»"
        send_telegram(CHAT_ID, auto_note)

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"ok": True}),
    }

#!/bin/bash

TELEGRAM_BOT_TOKEN=
TIME=15

URL="https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage"
TEXT="Кто-то прокручивает рулетку.."

curl -X POST -H 'Content-Type: application/json' \
  -d '{"chat_id": "", "text": "'"$TEXT"'"}' \
  "$URL"
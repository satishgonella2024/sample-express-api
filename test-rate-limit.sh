#!/bin/bash
# test-rate-limit.sh

for i in {1..150}; do
  echo "Request $i"
  curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTM0ZjhmYjQ5NjViYWNjMGFlMjgzNCIsImlhdCI6MTczNzcwNzQxM30.FxG3NxEO62qwwesdyBfAKoKeonYxje5ykzC6zvK2-yo" \
    http://localhost:3000/api/users
  echo -e "\n"
  sleep 0.1
done
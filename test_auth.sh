#!/bin/bash
RESPONSE=$(curl -s -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"tester_delete3", "password":"password", "email":"test_delete3@example.com"}')

TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')
echo "Token: $TOKEN"

docker exec rpg_database psql -U rpg_user -d rpg_engine -c "DELETE FROM users WHERE username='tester_delete3';"

curl -s -v -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"username":"tester_cors", "password":"password"}'

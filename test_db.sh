echo "Stop and remove development and test containers:"
docker stop postgres-test-db || true && docker rm postgres-test-db -f || true
docker stop some-postgres-db || true && docker rm some-postgres-db -f || true
# docker stop postgres-test-db3 || true && docker rm postgres-test-db3 -f || true
echo ""
echo "Start development and test containers:"
docker run --name some-postgres-db -p 5432:5432 -e POSTGRES_DB=initdb -e POSTGRES_PASSWORD=mysecretpassword -d postgres
docker run --name postgres-test-db -p 5433:5432 -e POSTGRES_DB=testdb -e POSTGRES_PASSWORD=mysecretpassword -d postgres

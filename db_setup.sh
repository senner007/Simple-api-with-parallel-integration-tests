echo "Stop and remove development and test containers:"
docker stop some-postgres-db || true && docker rm some-postgres-db -f || true
docker stop postgres-test-db1 || true && docker rm postgres-test-db1 -f || true
docker stop postgres-test-db2 || true && docker rm postgres-test-db2 -f || true
docker stop postgres-test-db3 || true && docker rm postgres-test-db3 -f || true
docker stop postgres-test-db4 || true && docker rm postgres-test-db4 -f || true
docker stop postgres-test-db5 || true && docker rm postgres-test-db5 -f || true



# docker stop postgres-test-db3 || true && docker rm postgres-test-db3 -f || true
echo ""
echo "Start development container:"
docker run --name some-postgres-db -p 5432:5432 -e POSTGRES_DB=initdb -e POSTGRES_PASSWORD=mysecretpassword -d postgres
echo ""
echo "Start test containers:"
docker run --name postgres-test-db1 -p 5433:5432 -e POSTGRES_DB=testdb -e POSTGRES_PASSWORD=mysecretpassword -d postgres -N 500 -c fsync=off
docker run --name postgres-test-db2 -p 5434:5432 -e POSTGRES_DB=testdb -e POSTGRES_PASSWORD=mysecretpassword -d postgres -N 500 -c fsync=off
docker run --name postgres-test-db3 -p 5435:5432 -e POSTGRES_DB=testdb -e POSTGRES_PASSWORD=mysecretpassword -d postgres -N 500 -c fsync=off
docker run --name postgres-test-db4 -p 5436:5432 -e POSTGRES_DB=testdb -e POSTGRES_PASSWORD=mysecretpassword -d postgres -N 500 -c fsync=off
docker run --name postgres-test-db5 -p 5437:5432 -e POSTGRES_DB=testdb -e POSTGRES_PASSWORD=mysecretpassword -d postgres -N 500 -c fsync=off

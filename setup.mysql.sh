#!/bin/bash

docker run --name dev-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=test -d -p 4008:3306 mysql:5.7.19

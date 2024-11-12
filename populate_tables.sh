#!/bin/bash

# Read environment variables
source .env

echo "Populating tables..."
# Connect to MySQL and execute SQL commands to create tables
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" < "populate.sql"
echo "DONE"
# Check return value of the previous command
if [ $? -ne 0 ]; then
    echo "Error creating tables."
    exit 1
fi

echo "Tables created successfully."

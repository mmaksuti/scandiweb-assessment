#!/bin/bash

# Read environment variables
source .env

# Connect to MySQL and execute SQL commands to create tables
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" -e "
SET FOREIGN_KEY_CHECKS = 0;
SET @tables = NULL;
SELECT GROUP_CONCAT('\`', table_name, '\`') INTO @tables
FROM information_schema.tables
WHERE table_schema = '$DB_NAME';
SET @drop_query = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @drop_query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1;
"

# Check return value of the previous command
if [ $? -ne 0 ]; then
    echo "Error deleting tables."
    exit 1
fi

echo "Tables deleted successfully."

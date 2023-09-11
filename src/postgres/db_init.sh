#!/bin/bash

# PostgreSQL connection parameters
DB_HOST="localhost"    # Replace with your PostgreSQL host
DB_PORT="5432"         # Replace with your PostgreSQL port
DB_USERNAME="postgres"   # Replace with your PostgreSQL username
DB_PASSWORD="postgres"   # Replace with your PostgreSQL password
DB_NAME="mooo"

# Check if the database already exists
if psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME -lqt | cut -d \| -f 1 | grep -wq $DB_NAME; then
  echo "Database '$DB_NAME' already exists."
else
  # Create the database if it doesn't exist
  psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME -c "CREATE DATABASE $DB_NAME"
  echo "Database '$DB_NAME' created."
fi


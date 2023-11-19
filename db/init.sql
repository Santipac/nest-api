SELECT 'CREATE DATABASE api_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'api_db')\gexec
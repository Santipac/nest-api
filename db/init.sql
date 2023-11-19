SELECT 'CREATE DATABASE api-db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'api-db')\gexec
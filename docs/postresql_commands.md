createuser --interactive
postgres=# create database warteapparatdb owner warteapparat;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();
CREATE TYPE order_state AS ENUM ('ORDERED', 'PICKEDUP', 'INVALID');
CREATE TABLE orders (order_id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, order_time TIMESTAMP, state order_state);
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO warteapparat;

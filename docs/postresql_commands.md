# create Postgres Database 
- als postgres user (`sudo su postgres`)
- `createuser --interactive`
  - `warteapparat` user anlegen
- in psql shell (`psql`) Datenabase und Table anlegen
  - `create database warteapparatdb owner warteapparat;`
  - `\connect warteapparatdb`
  - `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
  - `SELECT uuid_generate_v4();`
  - `CREATE TYPE order_state AS ENUM ('ORDERED', 'PICKEDUP', 'INVALID');`
  - `CREATE TABLE orders (order_id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, order_time TIMESTAMP, state order_state);`
  - `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO warteapparat;`


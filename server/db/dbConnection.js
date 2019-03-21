import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let connectionString = process.env.DEVDB;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
}
if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PRODB;
}
const pool = new Pool({
  connectionString,
});

export default pool;

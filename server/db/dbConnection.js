import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let connectionString= process.env.DEVDB;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
}
const pool = new Pool({
  connectionString,
});
console.log(process.env.NODE_ENV, '======================================', connectionString, process.env.SECRET_KEY);

export default pool;
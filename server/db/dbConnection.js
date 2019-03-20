import { Pool } from 'pg';

let connectionString;
if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DEVDB;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DEVDB;
} else {
  connectionString = process.env.PRODB;
}
const pool = new Pool({
  connectionString,
});

export default pool;

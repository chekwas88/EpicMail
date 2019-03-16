/* eslint-disable operator-linebreak */
import dotenv from 'dotenv';
// import { Pool } from 'pg';
import con from './dbConnection';
import dropQueries from './dropTableQueries';


dotenv.config();
const pool = con();
export default {
  dropTables: () => {
    pool.query(dropQueries)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

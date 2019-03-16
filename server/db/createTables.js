import dotenv from 'dotenv';
import createTable from './createTableQueries';
import con from './dbConnection';

dotenv.config();
const pool = con;

export default {
  createTables: () => {
    pool.query(createTable)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  },
};

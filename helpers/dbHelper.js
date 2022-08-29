

import mssql from 'mssql';
import { mssqlConnectionConfig } from "../config.js";

/*
dbHelper establishes a connection pool for the single
database we're using. Once an initial connection is
made then the pooling mechanism handles reconnecting
should the database have outages. However, if the 
initial connection fails then we need to attempt to
connect again. This helper manages making the initial 
connection.

Example usage:
try {
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM books')
    // process data in result
} catch(e) {
            console.log("db error ", e);
            throw "System Repository Error, please try later";
        }   
*/

// promise returned by mssql
// we add a status flag so that we can synchronously
// check whether a connection was established
let pool = null;
async function getDbPool() {

  // Already made an initial connection?
  if (pool  ) {
    return pool;
  }

  // if never connected try again
  try {
      pool = await new mssql.ConnectionPool(mssqlConnectionConfig).connect();

      console.log('Connected to MSSQL');
      return poolPromise;
  } catch (err) {
      console.log('Database Connection Failed!', err.originalError);
      return Promise.reject('Database Connection Failed!' + err.name);
  }
}

async function executeSql(queryString, parameters){
  const pool = await getDbPool();
  const request = await pool.request();
  if ( parameters ) { 
    Object.keys(parameters).forEach(
        (k) => request.input(k, parameters[k])
    );
  }  
  return request.query(queryString); 

}
export default executeSql;


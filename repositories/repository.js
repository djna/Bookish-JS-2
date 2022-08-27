
import { mssqlConnectionConfig } from "../config.js";

import mssql from 'mssql';

const dbPool = new mssql.ConnectionPool(mssqlConnectionConfig)
dbPool.on('error', err => {
    console.log("Connection Pool Error: " + err)
});
const dbConnection = dbPool.connect()

// early warning of connection issues, but continue as problems might be transitory
dbConnection.then( 
        () => console.log("connected") 
        ).catch( e => console.log("Initial connection error, will retry. Error:  " + e)) ;

export default class Repository {

    // parameter object has attributes corresponding to named parameters in queryString
    run(queryString, parameters){
    	return dbConnection.then(
               ( pool ) => {
                    let request = pool.request();

                    if ( parameters ) { 
                        Object.keys(parameters).forEach(
                            k => request.input(k, parameters[k])
                        );
                    }

                    return request.query( queryString );
               }
        );
    }
}

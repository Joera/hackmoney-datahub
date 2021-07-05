import bluebird from "bluebird";
import mongodb from "mongodb";
import assert from "assert";
import logger from "../util/logger";
import {MONGODB_URI } from "../util/secrets";


// set database connection object
const MongoClient = mongodb.MongoClient;

// get connection to mongodb
async function getMongoConnection(dbName: string) {

        return new Promise( (resolve,reject) => {

            return MongoClient.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, function(err, client) {
                if(err) {
                    logger.error({ payload : "failed to connect to" + MONGODB_URI});
                    reject();
                } else {
                    const database = client.db(dbName);
                    resolve(database);
                }
            });
        });
}

export function getCollection(dbName: string, collection: string) {

        return getMongoConnection(dbName).then((conn: any) => {
            return conn.collection(collection);
        }).catch((err) => {
            logger.debug({ payload : "failed miserably"});
        });

}

import logger from "../util/logger";
import { getCollection }  from "../connectors/mongo.connector";

/**
 * Class takes care of all database operations for the page
 */
export default class MongoStoreService {

    async find(options: any, dbName: string, collectionName: string ) {

        if (typeof options.limit === "undefined") {
            options.limit = 0;
        }

        const collection = await getCollection(dbName,collectionName);// get page collection
        return await collection.find(options.query).sort(options.sort).limit(options.limit).toArray();  // execute find query
    }


    async findOne(options: any, dbName: string, collectionName: string) {

        const collection = await getCollection(dbName,collectionName);
        return await collection.findOne(options.query); // execute find query
    }

    async save(data: any, dbName: string, collectionName: string) {

        let update: boolean;
        let result: boolean;

        try {
            const collection = await getCollection(dbName, collectionName); // get page collection
            const exists = await collection.findOne({ _id: data._id});

            if (exists !== null) {
                update = true;
                result = await collection.replaceOne({ _id: data._id},data,{ upsert : true}); // execute save
            } else {
                update = false;
                result = await collection.insertOne(data); // execute save
            }

            return;
        }

        catch (error) {
            console.log("failed to save item to mongo");
            return false;
        }
    }

    // async remove(id: string, dbName: string) {
    //
    //     try {
    //         const collection = await getCollection(dbName,"defiProposals");
    //         await collection.deleteOne({"_id": id});
    //         logger.info({ payload : "removed item from mongo"});
    //         return true;
    //     }
    //     catch (error) {
    //         logger.error({ payload : "failed to remove item from mongo"});
    //         return false;
    //     }
    // }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_connector_1 = require("../connectors/mongo.connector");
/**
 * Class takes care of all database operations for the page
 */
class MongoStoreService {
    find(options, dbName, collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof options.limit === "undefined") {
                options.limit = 0;
            }
            const collection = yield mongo_connector_1.getCollection(dbName, collectionName); // get page collection
            return yield collection.find(options.query).sort(options.sort).limit(options.limit).toArray(); // execute find query
        });
    }
    findOne(options, dbName, collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield mongo_connector_1.getCollection(dbName, collectionName);
            return yield collection.findOne(options.query); // execute find query
        });
    }
    save(data, dbName, collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            let update;
            let result;
            try {
                const collection = yield mongo_connector_1.getCollection(dbName, collectionName); // get page collection
                const exists = yield collection.findOne({ _id: data._id });
                if (exists !== null) {
                    update = true;
                    result = yield collection.replaceOne({ _id: data._id }, data, { upsert: true }); // execute save
                }
                else {
                    update = false;
                    result = yield collection.insertOne(data); // execute save
                }
                return;
            }
            catch (error) {
                console.log("failed to save item to mongo");
                return false;
            }
        });
    }
}
exports.default = MongoStoreService;
//# sourceMappingURL=mongostore.service.js.map
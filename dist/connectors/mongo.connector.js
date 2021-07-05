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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = void 0;
const mongodb_1 = __importDefault(require("mongodb"));
const logger_1 = __importDefault(require("../util/logger"));
const secrets_1 = require("../util/secrets");
// set database connection object
const MongoClient = mongodb_1.default.MongoClient;
// get connection to mongodb
function getMongoConnection(dbName) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            return MongoClient.connect(secrets_1.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, function (err, client) {
                if (err) {
                    logger_1.default.error({ payload: "failed to connect to" + secrets_1.MONGODB_URI });
                    reject();
                }
                else {
                    const database = client.db(dbName);
                    resolve(database);
                }
            });
        });
    });
}
function getCollection(dbName, collection) {
    return getMongoConnection(dbName).then((conn) => {
        return conn.collection(collection);
    }).catch((err) => {
        logger_1.default.debug({ payload: "failed miserably" });
    });
}
exports.getCollection = getCollection;
//# sourceMappingURL=mongo.connector.js.map
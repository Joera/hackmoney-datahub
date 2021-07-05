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
exports.gatherProposals = void 0;
const request_service_1 = __importDefault(require("../services/request.service"));
const mongostore_service_1 = __importDefault(require("../services/mongostore.service"));
const slugify_1 = __importDefault(require("slugify"));
const requests = new request_service_1.default();
const mongoStore = new mongostore_service_1.default();
const gatherProposals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    let data = [];
    try {
        //   const p1: any = await requests.uniswap(); 
        // const p2 = await requests.compound();
        //  const p3 = await requests.aave();
        // const p4 = await requests.yearn();
        //   const p5 = await requests.snapshotProposals();
        //   data = data.concat(p5); //.concat(p2).concat(p3).concat(p4); // .concat(p5);
    }
    catch (error) {
        res.status(200); // set http status code for response
        res.json("failed at one of the requests"); // send response body
    }
    try {
        for (const proposalData of data) {
            proposalData._id = slugify_1.default(proposalData.endBlock + proposalData.excerpt).slice(0, 32);
            console.log(proposalData._id);
            proposalData.collectionDate = new Date().getTime();
            yield mongoStore.save(proposalData, "hackmoney", "proposals");
        }
    }
    catch (error) {
        res.status(200); // set http status code for response
        res.json("failed to store data"); // send response body
    }
    res.status(201); // set http status code for response
    res.json("stored " + data.length + " proposals"); // send response body
});
exports.gatherProposals = gatherProposals;
//# sourceMappingURL=main.controller.js.map
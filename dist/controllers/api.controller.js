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
exports.defiProposals = void 0;
const mongostore_service_1 = __importDefault(require("../services/mongostore.service"));
const mongoStore = new mongostore_service_1.default();
const defiProposals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    try {
        //   result = await mongoStore.findOne({ query : { $query:{}, $orderby: { timestamp:-1 }} }, 'hackmoney','defiProposals');
        result = yield mongoStore.find({ query: {} }, "hackmoney", "proposals");
    }
    catch (e) {
        console.log(e);
        res.status(201);
    }
    res.status(200);
    res.json(result);
});
exports.defiProposals = defiProposals;
//# sourceMappingURL=api.controller.js.map
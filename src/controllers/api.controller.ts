import { Request, Response } from "express";
import MongoStoreService from "../services/mongostore.service";

const mongoStore = new MongoStoreService();

export const defiProposals = async (req : Request, res : Response) => {

      let result;

      try {

         //   result = await mongoStore.findOne({ query : { $query:{}, $orderby: { timestamp:-1 }} }, 'hackmoney','defiProposals');
            result = await mongoStore.find({ query : {}}, "hackmoney","proposals");


      } catch(e) {
            console.log(e);
            res.status(201);
      }

      res.status(200);
      res.json(result);
};

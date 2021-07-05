

import { Request, Response } from "express";
import RequestService from "../services/request.service";
import MongoStoreService from "../services/mongostore.service";
import slugify from "slugify";

const requests = new RequestService();
const mongoStore = new MongoStoreService();

export const gatherProposals = async (req: Request, res: Response) => {

  res.status(200);

    let data: any[] = [];

    try {

     //   const p1: any = await requests.uniswap();
        // const p2 = await requests.compound();
    //  const p3 = await requests.aave();
        // const p4 = await requests.yearn();
   //   const p5 = await requests.snapshotProposals();
   //   data = data.concat(p5); //.concat(p2).concat(p3).concat(p4); // .concat(p5);

    }
    catch(error) {

      res.status(200); // set http status code for response
      res.json("failed at one of the requests"); // send response body
    }

    try {

      for (const proposalData of data) {
        proposalData._id = slugify(proposalData.endBlock + proposalData.excerpt).slice(0,32);
        console.log(proposalData._id);
        proposalData.collectionDate = new Date().getTime();
        await mongoStore.save(proposalData, "hackmoney","proposals");
      }
    }

    catch(error) {

      res.status(200); // set http status code for response
      res.json("failed to store data"); // send response body
    }

      res.status(201); // set http status code for response
      res.json("stored " + data.length + " proposals"); // send response body

};

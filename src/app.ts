import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";

// Controllers (route handlers)
import * as mainController from "./controllers/main.controller";
import * as apiController from "./controllers/api.controller";
import cors from "cors";
// Create Express server
const app = express();
// Express configuration
app.use(cors({
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/api/defiproposals", apiController.defiProposals);
app.get("/api/gatherproposals", mainController.gatherProposals);

export default app;

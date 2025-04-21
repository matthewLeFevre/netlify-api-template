import express, { json } from "express";
import serverless from "serverless-http";
import cors from "cors";
import bodyParseJson from "../middleware/bodyParseJson";
import exampleRouter from "../router/example";
import setupDB from "../middleware/setupDb";

const api = express();
api.use(cors());
api.use(json());
api.use(setupDB);
api.use(bodyParseJson());

api.use("/api/", exampleRouter);

export const handler = serverless(api, {
  binary: ["application/json"],
});

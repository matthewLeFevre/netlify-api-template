import express, { Router, json } from "express";
import serverless from "serverless-http";
import cors from "cors";
import bodyParseJson from "../middleware/bodyParseJson";

const api = express();
api.use(cors());
api.use(json());
api.use(bodyParseJson);

const router = Router();
router.get("/", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

router.post("/", (req, res) => {
  res.json({ ...req.body });
});

api.use("/api/", router);

export const handler = serverless(api, {
  binary: ["application/json"],
});

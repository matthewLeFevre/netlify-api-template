import { NextFunction, Request, RequestHandler, Response } from "express";

const bodyParseJson: RequestHandler = (req, res, next) => {
  if (req.body instanceof Buffer && req.method !== "GET") {
    try {
      req.body = JSON.parse(req.body.toString());
    } catch (err) {
      res.status(400).json({ error: "Invalid JSON data" });
      return;
    }
  }
  next();
};

export default bodyParseJson;

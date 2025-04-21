import { NextFunction, Request, Response } from "express";
import db from "../db";

export default function (req: Request, res: Response, next: NextFunction) {
  (req as any).db = db;
  next();
}

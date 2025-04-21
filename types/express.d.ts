import "express";
import db from "../netlify/db";

declare global {
  namespace Express {
    interface Request {
      db: typeof db;
    }
  }
}

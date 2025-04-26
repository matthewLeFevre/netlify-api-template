import { Handler } from "@netlify/functions";
import db from "../db";

export const handler: Handler = async (event, context) => {
  db;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from a TypeScript Netlify Function!",
    }),
  };
};

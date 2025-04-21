import * as z from "zod";
import { runner } from "./handleAsync";

export default function (schema: z.ZodSchema) {
  return runner(async (req, send, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      send({
        status: 400,
        message: "Invalid request params",
        data: result.error.errors,
      });
      return;
    }
    next();
  });
}

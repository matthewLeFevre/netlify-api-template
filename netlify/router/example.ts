import { Router } from "express";
import { runner } from "../middleware/handleAsync";
import validateBody from "../middleware/validateBody";
import { z } from "zod";

const exampleRouter = Router();

exampleRouter.get(
  "/",
  runner(async (req, send) => {
    send({
      data: {
        hello: "world",
      },
    });
  })
);

exampleRouter.post(
  "/",
  validateBody(
    z.object({
      name: z.string(),
      count: z.number(),
    })
  ),
  runner(async (req, send) => {
    const body = req.body;
    send({
      status: 200,
      data: body,
      message: "Request Successful",
    });
  })
);

export default exampleRouter;

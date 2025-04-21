import { Router } from "express";
import { runner } from "../middleware/handleAsync";

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

import { NextFunction, Request, Response } from "express";

interface AsyncWrapperOptions {
  development: {
    sendAllErrors: boolean;
  };
}

function asyncWrapper(
  asyncFn: Function,
  options: AsyncWrapperOptions = { development: { sendAllErrors: true } }
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await asyncFn(req, res, next);
    } catch (err: any) {
      if (err?.isAxiosError) {
        err = err.response;
        err.message = err?.data?.message;
      }
      if (process.env.NODE_ENV === "development") console.error(err);

      const isAppError = Boolean(err.status);
      let status = 500;
      let message = "An unexpected error occured.";

      if (
        isAppError ||
        (options.development.sendAllErrors &&
          process.env.NODE_ENV === "development")
      ) {
        status = err.status;
        message = err.message;
      }
      send({
        res,
        status: status || 500,
        message: message || "Unidentified Failure",
      });
    }
  };
}

export class CustomError extends Error {
  status: number;
  constructor(name: string, message: string, status?: number) {
    super(message);
    this.name = name;
    this.status = status || 500;
  }
}

interface SendInterface {
  res: any;
  status?: number;
  data?: object;
  message?: string;
}

function send(payload: SendInterface) {
  if (
    payload?.data &&
    payload?.status !== 400 &&
    payload?.message !== "Errors found"
  ) {
    if (!(payload.data != null && payload.data.constructor.name === "Object"))
      throw new CustomError("TypeError", "Data should be a valid object", 400);
  }
  const { res, status = 200, data, message } = payload;
  if (status >= 200 && status < 300) {
    res.statusText = message || "Request Successful";
    res.status(status).json({
      data,
      message: message || "Request Successful",
    });
  } else {
    res.statusText = message || "Request Failed";
    res.status(status).json({
      data,
      message: message || "Request Failed",
    });
  }
}

type FinalSendFunc = ({
  status,
  data,
  message,
}: {
  status?: number;
  data?: object;
  message?: string;
}) => void;

type RunnerFunc = (
  request: Request,
  finalSend: FinalSendFunc,
  next: NextFunction
) => Promise<void>;

export function runner(func: RunnerFunc, options?: AsyncWrapperOptions) {
  return asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      return func(
        req,
        ({ status, data, message }) => send({ res, status, data, message }),
        next
      );
    },
    options
  );
}

import { runner } from "./handleAsync";
export default function () {
  return runner(async (req, send, next) => {
    if (req.body instanceof Buffer && req.method !== "GET") {
      try {
        req.body = JSON.parse(req.body.toString());
      } catch (err) {
        send({
          status: 400,
          message: "Invalid JSON data",
        });
        return;
      }
    }
    next();
  });
}

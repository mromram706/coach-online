import * as functions from "firebase-functions";
import next from "next";
import { Request, Response } from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

exports.nextjsFunc = functions.https.onRequest((req: Request, res: Response) => {
  return app.prepare().then(() => handle(req, res));
});

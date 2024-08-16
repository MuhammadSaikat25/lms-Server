import { NextFunction, Request, Response } from "express";

const catchAsyncError =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next));
  };

  export default catchAsyncError
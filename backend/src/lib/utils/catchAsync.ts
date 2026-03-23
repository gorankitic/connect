// modules
import { NextFunction, Request, Response } from "express";

export const catchAsync = <T extends Request>(controller: (req: T, res: Response, next: NextFunction) => Promise<any> | any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Wrap the controller function in Promise.resolve() so that:
        // 1) If controller is async, any rejected Promise is caught
        // 2) If controller throws synchronously, thrown error is converted into a rejected Promise
        // Forward both sync and async errors to Express global error handler
        Promise.resolve(controller(req as T, res, next)).catch(error => next(error));
    }
}
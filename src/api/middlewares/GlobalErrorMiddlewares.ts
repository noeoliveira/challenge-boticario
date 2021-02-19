import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "class-validator";
import { AppError } from "../../shared/Exceptions/AppError";

@Middleware({ type: "after" })
export class GlobalErrorMiddlewares implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    let body;

    if (error instanceof AppError) {
      body = { statusCode: error.error, message: error.message };
    } else if (error instanceof UnauthorizedError) {
      body = { statusCode: error.httpCode, message: error.message };
    } else if (
      Array.isArray(error?.errors) &&
      error.errors.some((element: any) => element instanceof ValidationError)
    ) {
      const { value, property, constraints } = error
        .errors[0] as ValidationError;

      body = {
        statusCode: 400,
        value,
        property,
        constraints,
        message: error.message,
      };
    } else {
      body = { statusCode: 500, message: "internal error" };
    }

    response.status(body.statusCode).json(body);
  }
}

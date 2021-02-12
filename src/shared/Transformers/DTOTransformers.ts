// import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";

// export class DTOMiddleware implements ExpressMiddlewareInterface {
//   use(request: any, response: any, next: (err?: any) => any) {
//     next();
//   }
// }

export function DTOTransformers(input: any, dto: any) {
  if (input) {
    return new dto(input);
  }
  return input;
}

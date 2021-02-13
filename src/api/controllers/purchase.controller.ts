import {
  Get,
  Param,
  Post,
  JsonController,
  Body,
  HttpCode,
  OnUndefined,
} from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { container } from "tsyringe";

import {
  IPurchaseService,
  PurchaseDTO,
  PurchaseInput,
} from "../../application/PurchaseService";
import { TokenIOC } from "../../shared";

@JsonController()
export class PurchaseController {
  public constructor(
    private readonly purchaseService: IPurchaseService = container.resolve(
      TokenIOC.PurchaseServiceToken
    )
  ) {}

  @Post("/purchase", { transformResponse: true })
  @HttpCode(201)
  @ResponseSchema(PurchaseDTO)
  public createPurchase(@Body() data: PurchaseInput) {
    return this.purchaseService.save(data);
  }

  @Get("/purchase/:code", { transformResponse: true })
  @OnUndefined(404)
  @ResponseSchema(PurchaseDTO)
  public getByCode(@Param("code") code: string) {
    return this.purchaseService.findByCode(code);
  }
}

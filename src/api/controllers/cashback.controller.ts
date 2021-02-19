import {
  Authorized,
  Get,
  JsonController,
  OnUndefined,
  QueryParam,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { container } from "tsyringe";
import { IPurchaseService, PurchaseDTO } from "../../application/PurchaseService";
import { TokenIOC } from "../../shared";

@OpenAPI({
  security: [
    {
      Authorization: [],
    },
  ],
})
@Authorized()
@JsonController()
export class CashBackController {
  public constructor(
    private readonly purchaseService: IPurchaseService = container.resolve(
      TokenIOC.PurchaseServiceToken
    )
  ) {}

  @Get("/cashback", { transformResponse: true })
  @OnUndefined(404)
  @ResponseSchema(PurchaseDTO)
  public AllGetCashback(@QueryParam("cpf") cpf: string) {
    return this.purchaseService.cashback(cpf);
  }
}

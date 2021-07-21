import {
  Authorized,
  Get,
  JsonController,
  OnUndefined,
  QueryParam,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { container } from "tsyringe";
import {
  IPurchaseService,
  CashBackDTO,
} from "../../application/PurchaseService";
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
  @ResponseSchema(CashBackDTO)
  public AllGetCashback(@QueryParam("cpf") cpf: string) {
    return this.purchaseService.cashback(cpf);
  }
}

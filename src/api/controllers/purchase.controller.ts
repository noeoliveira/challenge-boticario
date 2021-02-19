import {
  Get,
  Param,
  Post,
  JsonController,
  Body,
  HttpCode,
  OnUndefined,
  Authorized,
  QueryParam,
  Put,
  Delete,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { container } from "tsyringe";
import {
  IPurchaseService,
  PurchaseDTO,
  PurchaseInput,
  PurchaseInputOptional,
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

  @Get("/purchases", { transformResponse: true })
  @OnUndefined(404)
  @ResponseSchema(PurchaseDTO, { isArray: true })
  public getAll(@QueryParam("cpf_consultant") id_consultant: string) {
    return this.purchaseService.findAll(id_consultant);
  }

  @Put("/purchase/:code", { transformResponse: true })
  @ResponseSchema(PurchaseDTO)
  public UpdateByCode(
    @Param("code") code: string,
    @Body() data: PurchaseInputOptional.PurchaseInput
  ) {
    return this.purchaseService.update(code, data);
  }

  @Delete("/purchase/:code", { transformResponse: true })
  @ResponseSchema(PurchaseDTO, { isArray: true })
  public DeleteByCode(@Param("code") code: string) {
    return this.purchaseService.delete(code);
  }
}

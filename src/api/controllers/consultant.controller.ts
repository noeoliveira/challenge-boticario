import {
  Get,
  Param,
  Post,
  JsonController,
  Body,
  HttpCode,
  OnUndefined,
  Authorized,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { container } from "tsyringe";

import { TokenIOC } from "@shared";
import {
  IConsultantService,
  ConsultantDTO,
  ConsultantInput,
} from "@application/ConsultantService";

@JsonController()
export class ConsultantController {
  public constructor(
    private readonly consultantService: IConsultantService = container.resolve(
      TokenIOC.ConsultantServiceToken
    )
  ) {}

  @Post("/consultant", { transformResponse: true })
  @HttpCode(201)
  @ResponseSchema(ConsultantDTO)
  public createConsultant(@Body() data: ConsultantInput) {
    return this.consultantService.save(data);
  }

  @OpenAPI({
    security: [
      {
        Authorization: [],
      },
    ],
  })
  @Get("/consultant/:cpf", { transformResponse: true })
  @OnUndefined(404)
  @ResponseSchema(ConsultantDTO)
  @Authorized()
  public getByCpf(@Param("cpf") cpf: string) {
    return this.consultantService.findByCpf(cpf);
  }
}

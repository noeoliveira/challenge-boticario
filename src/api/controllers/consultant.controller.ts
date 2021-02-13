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
  ConsultantDTO,
  ConsultantInput,
  IConsultantService,
} from "../../application/ConsultantService";
import { TokenIOC } from "../../shared/";

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

  @Get("/consultant/:cpf", { transformResponse: true })
  @OnUndefined(404)
  @ResponseSchema(ConsultantDTO)
  public getByCpf(@Param("cpf") cpf: string) {
    return this.consultantService.findByCpf(cpf);
  }
}

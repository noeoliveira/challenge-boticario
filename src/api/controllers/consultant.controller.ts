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

import { IConsultantService } from "../../application/ConsultantService";
import { DTOTransformers } from "../../shared/";
import { ConsultantInput } from "../validators/input/consultant.input";
import { ConsultantDTO } from "../validators/output/consultant.output";

@JsonController()
export class ConsultantController {
  public constructor(
    private readonly consultantService: IConsultantService = container.resolve(
      "ConsultantService"
    )
  ) {}

  @Post("/consultant", { transformResponse: true })
  @HttpCode(201)
  @ResponseSchema(ConsultantDTO)
  public async createConsultant(@Body() data: ConsultantInput) {
    return DTOTransformers(
      await this.consultantService.save(data),
      ConsultantDTO
    );
  }

  @Get("/consultant/:cpf", { transformResponse: true })
  @OnUndefined(404)
  @ResponseSchema(ConsultantDTO)
  public async getByCpf(@Param("cpf") cpf: string) {
    return DTOTransformers(
      await this.consultantService.findByCpf(cpf),
      ConsultantDTO
    );
  }
}

import { container } from "tsyringe";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { IConsultantService } from "../../application/ConsultantService";
import { TokenIOC } from "../../shared";
import { ConsultantType, InputConsultant } from "../types/ConsultantType";

@Resolver(ConsultantType)
export class ConsultantResolver {
  public constructor(
    private readonly consultantService: IConsultantService = container.resolve(
      TokenIOC.ConsultantServiceToken
    )
  ) {}

  @Mutation(() => ConsultantType)
  public createConsultant(@Arg("data") data: InputConsultant) {
    return this.consultantService.save(data);
  }

  @Query(() => ConsultantType)
  public getByCpf(@Arg("cpf") cpf: string) {
    return this.consultantService.findByCpf(cpf);
  }
}

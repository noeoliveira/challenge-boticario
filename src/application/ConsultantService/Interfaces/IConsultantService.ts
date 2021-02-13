import { ConsultantInput } from "../input/consultant.input";
import { ConsultantDTO } from "../output/consultant.output";

export interface IConsultantService {
  save(consultant: ConsultantInput): Promise<ConsultantDTO>;
  findByCpf(cpf: string): Promise<ConsultantDTO | undefined>;
}

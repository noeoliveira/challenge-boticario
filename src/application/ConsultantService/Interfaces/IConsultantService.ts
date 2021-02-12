import { IConsultant } from "../../../domain/Interfaces/Entity/IConsultant";

export interface IConsultantService {
  save(consultant: IConsultant): Promise<IConsultant>;
  findByCpf(cpf: string): Promise<IConsultant | undefined>;
}

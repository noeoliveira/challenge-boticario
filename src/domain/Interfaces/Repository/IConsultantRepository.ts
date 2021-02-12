import { IConsultant } from "../Entity/IConsultant";

export interface IConsultantRepository {
  save(consultant: IConsultant): Promise<IConsultant>;
  findByCpf(cpf: string): Promise<IConsultant | undefined>;
}

import { SingInInput, SingInDTO } from "../";

export interface IAuthService {
  singin(data: SingInInput): Promise<SingInDTO>;
}

import { injectable, inject } from "tsyringe";
import jwt from "jsonwebtoken";
import { IAuthService, SingInInput, SingInDTO } from ".";
import { Consultant } from "../../domain/Entity";
import { IConsultantRepository } from "../../domain/Interfaces";
import {
  TokenIOC,
  Utils,
  AppError,
  Errors,
  DTOTransformers,
  env,
} from "../../shared";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TokenIOC.ConsultantRepositoryToken)
    private consultantRepository: IConsultantRepository
  ) {}

  async singin({ cpf, password }: SingInInput): Promise<SingInDTO> {
    const consultant = await this.consultantRepository.findByCpf(
      Utils.formartCPFToNumber(cpf)
    );

    if (
      !consultant ||
      !Consultant.comparePassword(password, consultant.password)
    ) {
      throw new AppError("cpf and password not match", Errors.UNAUTHORIZED);
    }

    const token = jwt.sign({ cpf: consultant.cpf }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRE,
    });

    return DTOTransformers({ token, consultant }, SingInDTO);
  }
}

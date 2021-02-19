import faker from "faker/locale/pt_BR";
import cpf from "cpf";
import {
  IAuthService,
  AuthService,
  SingInDTO,
} from "../../application/AuthService";
import {
  IConsultantService,
  ConsultantService,
  ConsultantDTO,
} from "../../application/ConsultantService";
import { AppError } from "../../shared";
import { MockConsultantRepository } from "../mock/infra/Repository";

describe("AuthService", () => {
  const consultantRepository = new MockConsultantRepository();

  const consultantService: IConsultantService = new ConsultantService(
    consultantRepository
  );

  const authService: IAuthService = new AuthService(consultantRepository);

  const data = {
    cpf: cpf.generate(true),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
    password: faker.internet.password(8),
  };

  it("should be able to create a new consultant", async () => {
    const consultant = await consultantService.save(data);

    expect(consultant).toBeInstanceOf(ConsultantDTO);

    expect(
      authService.singin({
        cpf: data.cpf,
        password: faker.internet.password(8),
      })
    ).rejects.toBeInstanceOf(AppError);

    const auth = await authService.singin({
      cpf: data.cpf,
      password: data.password,
    });

    expect(auth).toBeInstanceOf(SingInDTO);
  });
});

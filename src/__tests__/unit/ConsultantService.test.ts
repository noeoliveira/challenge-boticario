import faker from "faker/locale/pt_BR";
import cpf from "cpf";
import {
  IConsultantService,
  ConsultantService,
  ConsultantDTO,
} from "../../application/ConsultantService";
import { AppError } from "../../shared";
import { MockConsultantRepository } from "../mock/infra/Repository";

describe("ConsultantService", () => {
  const consultantService: IConsultantService = new ConsultantService(
    new MockConsultantRepository()
  );

  const data = {
    cpf: cpf.generate(true),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
    password: faker.internet.password(8),
  };

  it("should be able to create a new consultant", async () => {
    const consultant = await consultantService.save(data);

    expect(consultant).toBeInstanceOf(ConsultantDTO);
  });

  it("should be able to search a consultant by CPF", async () => {
    const consultant = await consultantService.findByCpf(data.cpf);

    expect(consultant).toBeInstanceOf(ConsultantDTO || undefined);
  });

  it("should be able to duplicate consultant", async () => {
    expect(consultantService.save(data)).rejects.toBeInstanceOf(AppError);
  });
});

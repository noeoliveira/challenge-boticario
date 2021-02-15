import {
  ConsultantDTO,
  ConsultantService,
  IConsultantService,
} from "@application/ConsultantService";
import faker from "faker";
import cpf from "cpf";
import { MockConsultantRepository } from "@test/mock/infra/Repository";

faker.setLocale("pt_BR");

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
});

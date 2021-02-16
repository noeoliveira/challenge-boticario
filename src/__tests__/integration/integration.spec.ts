import faker from "faker/locale/pt_BR";
import cpf from "cpf";
import supertest from "supertest";
import app from "@api/app";
import { connectDatabase } from "@root/connectDatabase";

const api = supertest(app);

beforeAll(async () => {
  await connectDatabase();
});

const data = {
  cpf: cpf.generate(true),
  email: faker.internet.email(),
  name: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
  password: faker.internet.password(8),
};

const dataAdmin = {
  cpf: "153.509.460-56",
  email: "admin@admin.com.br",
  name: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
  password: "12345678",
};

describe("ConsultantService", () => {
  it("should be able to create a new consultant", async () => {
    const response = await api.post("/api/consultant").send(data);

    expect(response.status).toBe(201);

    const { status: statusDuplicate } = await api
      .post("/api/consultant")
      .send(data);

    expect(statusDuplicate).toBe(400);
  });
});

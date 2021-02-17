import faker from "faker/locale/pt_BR";
import cpf from "cpf";
import supertest from "supertest";
import app from "@api/app";
import { connectDatabase } from "@root/connectDatabase";
let api: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  await connectDatabase();
  api = supertest(app.init());
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

let token: string;

describe("Consultant routers", () => {
  it("should be able to create a new consultant", async () => {
    await api.post("/api/consultant").send(data).expect(201);

    await api.post("/api/consultant").send(dataAdmin).expect(201);
    await api.post("/api/consultant").send(data).expect(400);
  });

  it("should be able to authenticate consultant", async () => {
    const response = await api
      .post("/api/singin")
      .send({ cpf: data.cpf, password: data.password })
      .expect(200);

    token = "Bearer " + response.body.token;

    await api
      .post("/api/singin")
      .send({ cpf: data.cpf, password: faker.internet.password(8) })
      .expect(401);
  });

  it("should be able to get consultant", async () => {
    await api
      .get(`/api/consultant/${data.cpf}`)
      .set({ Authorization: token })
      .expect(200);

    await api.get(`/api/consultant/${data.cpf}`).expect(401);

    await api
      .get(`/api/consultant/${cpf.generate(true)}`)
      .set({ Authorization: token })
      .expect(404);
  });
});

const dataPurchase = {
  code_purchase: faker.random.alphaNumeric(6),
  date_purchase: faker.date.recent(),
  value: Number(faker.finance.amount(undefined, 5000)),
  id_consultant: data.cpf,
};

const dataPurchaseAdmin = {
  code_purchase: faker.random.alphaNumeric(6),
  date_purchase: faker.date.recent(),
  value: Number(faker.finance.amount(undefined, 5000)),
  id_consultant: dataAdmin.cpf,
};

describe("Purchase routers", () => {
  it("should be able to create a new purchase", async () => {
    await api.post("/api/purchase").send(dataPurchase).expect(401);

    const response = await api
      .post("/api/purchase")
      .send(dataPurchase)
      .set({ Authorization: token });

    expect(response.status).toBe(201);
    expect("Em validação").toBe(response.body.status.description);

    const responseAdmin = await api
      .post("/api/purchase")
      .send(dataPurchaseAdmin)
      .set({ Authorization: token });

    expect(responseAdmin.status).toBe(201);
    expect("Aprovado").toBe(responseAdmin.body.status.description);

    await api
      .post("/api/purchase")
      .send({ ...dataPurchase, id_consultant: cpf.generate(true) })
      .set({ Authorization: token })
      .expect(404);

    await api
      .post("/api/purchase")
      .send(dataPurchase)
      .set({ Authorization: token })
      .expect(400);
  });

  it("should be able to get purchase", async () => {
    await api.get(`/api/purchase/${dataPurchase.code_purchase}`).expect(401);

    await api
      .get(`/api/purchase/${dataPurchase.code_purchase}`)
      .set({ Authorization: token })
      .expect(200);

    await api
      .get(`/api/purchase/${faker.random.alphaNumeric(6)}`)
      .set({ Authorization: token })
      .expect(404);
  });
});

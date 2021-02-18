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
  password: "@Test123",
};

let token: string;

describe("Consultant routers", () => {
  it("should be able to create a new consultant", async () => {
    await api.post("/api/consultant").send(data).expect(201);

    await api.post("/api/consultant").send(dataAdmin).expect(201);
    await api.post("/api/consultant").send(data).expect(400);
    await api
      .post("/api/consultant")
      .send({
        cpf: faker.random.number({ min: 10000000000, precision: 0 }),
        email: faker.internet.email(),
        name: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
        password: faker.internet.password(8),
      })
      .expect(400);
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
    expect(response.body.status.description).toBe("Em validação");

    expect(response.body.cashback_value).toBe(
      Number(
        (
          dataPurchase.value *
          (response.body.cashback_percentage / 100)
        ).toFixed(2)
      )
    );

    const responseAdmin = await api
      .post("/api/purchase")
      .send(dataPurchaseAdmin)
      .set({ Authorization: token });

    expect(responseAdmin.status).toBe(201);
    expect(responseAdmin.body.status.description).toBe("Aprovado");

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

  it("should be able to get all purchases", async () => {
    await api.get(`/api/purchases`).expect(401);

    const response = await api
      .get(`/api/purchases`)
      .set({ Authorization: token });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should be able to get cashback", async () => {
    await api.get(`/api/cashback?cpf=${data.cpf}`).expect(401);

    await api
      .get(`/api/cashback?cpf=${data.cpf}`)
      .set({ Authorization: token })
      .expect(200);
  });

  it("should be able to update purchases", async () => {
    await api.put(`/api/purchase/${dataPurchase.code_purchase}`).expect(401);

    const response = await api
      .put(`/api/purchase/${dataPurchase.code_purchase}`)
      .send({ value: 2222 })
      .set({ Authorization: token });

    expect(response.status).toBe(200);
    expect(response.body.cashback_value).toBe(
      Number((2222 * (response.body.cashback_percentage / 100)).toFixed(2))
    );

    await api
      .put(`/api/purchase/${dataPurchaseAdmin.code_purchase}`)
      .send({ id_consultant: cpf.generate() })
      .set({ Authorization: token })
      .expect(404);

    await api
      .put(`/api/purchase/${dataPurchaseAdmin.code_purchase}`)
      .send({ value: 2222 })
      .set({ Authorization: token })
      .expect(406);

    await api
      .put(`/api/purchase/${faker.random.alphaNumeric(6)}`)
      .send({ value: 2222 })
      .set({ Authorization: token })
      .expect(404);
  });

  it("should be able to update purchases", async () => {
    await api.delete(`/api/purchase/${dataPurchase.code_purchase}`).expect(401);

    await api
      .delete(`/api/purchase/${dataPurchase.code_purchase}`)
      .set({ Authorization: token })
      .expect(200);

    await api
      .delete(`/api/purchase/${dataPurchaseAdmin.code_purchase}`)
      .set({ Authorization: token })
      .expect(406);
  });
});

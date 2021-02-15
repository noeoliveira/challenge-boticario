export * from "./CustonsValidators/ClassAutoValidator";
export * from "./CustonsValidators/IsCPF";
export * from "./Transformers/DTOTransformers";
export * as Utils from "./Transformers/utils";
export * as TokenIOC from "./IOC/Tokens";

export const env = {
  DATABASE_TYPE: process.env.DATABASE_TYPE,
  DATABASE_DATABASE: process.env.DATABASE_DATABASE as string,
  SERVER_PORT: process.env.SERVER_PORT as string,
};

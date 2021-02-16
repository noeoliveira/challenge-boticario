export * from "./CustonsValidators/ClassAutoValidator";
export * from "./CustonsValidators/IsCPF";
export * from "./Transformers/DTOTransformers";
export * as Utils from "./Transformers/utils";
export * as TokenIOC from "./IOC/Tokens";
export * from "./Exceptions/AppError";

export const env = {
  NODE_ENV: process.env.NODE_ENV as string,
  SERVER_PORT: process.env.SERVER_PORT as string,
};

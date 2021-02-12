import { isCPF } from "brazilian-values";
import { registerDecorator, ValidationOptions } from "class-validator";

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsCPF",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isCPF(value); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
        defaultMessage: (ValidationArguments) =>
          `${ValidationArguments?.property} must be an cpf`,
      },
    });
  };
}

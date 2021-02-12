import { validateSync } from "class-validator";

interface Class {
  new (...args: any[]): {};
}

const lastClassWithValidation = Symbol();

export function AutoValidator<T extends Class>(target: T) {
  return class extends target {
    static [lastClassWithValidation] = target;
    constructor(...args: any[]) {
      super(...args);

      if ((<any>this.constructor)[lastClassWithValidation] === target) {
        const errors = validateSync(this);

        if (errors.length > 0) {
          throw errors;
        }
      }
    }
  };
}

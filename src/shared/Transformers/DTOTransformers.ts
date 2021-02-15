export function DTOTransformers(input: any, dto: any) {
  if (input) {
    return new dto(input);
  }
  return input;
}

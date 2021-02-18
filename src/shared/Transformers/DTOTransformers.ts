export function DTOTransformers(input: any, DTO: any) {
  if (input) {
    if (Array.isArray(input)) {
      return input.map((item) => new DTO(item));
    }
    return new DTO(input);
  }
  return input;
}

export function formartCPFToNumber(cpf: string) {
  return cpf.replace(/\D/g, "");
}

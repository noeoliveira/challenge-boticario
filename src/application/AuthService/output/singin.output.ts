import { ConsultantDTO } from "@application/ConsultantService";
import { Type } from "class-transformer";
import { ValidateNested, IsJWT } from "class-validator";

export class SingInDTO {
  constructor(data: Partial<SingInDTO>) {
    Object.assign(this, data);
  }

  @IsJWT()
  token!: string;

  @Type(() => ConsultantDTO)
  @ValidateNested({ each: true })
  consultant!: ConsultantDTO;
}

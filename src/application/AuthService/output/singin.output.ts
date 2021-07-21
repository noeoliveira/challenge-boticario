import { Type } from "class-transformer";
import { ValidateNested, IsJWT } from "class-validator";
import { ConsultantDTO } from "../../ConsultantService";

export class SingInDTO {
  constructor(data: Partial<SingInDTO>) {
    Object.assign(this, data);
  }

  @IsJWT()
  token!: string;

  @Type(() => ConsultantDTO)
  @ValidateNested()
  consultant!: ConsultantDTO;
}

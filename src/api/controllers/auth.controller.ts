import { Post, JsonController, Body, HttpCode } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { container } from "tsyringe";

import { TokenIOC } from "@shared";
import { IAuthService, SingInDTO, SingInInput } from "@application/AuthService";

@JsonController()
export class AuthController {
  public constructor(
    private readonly AuthService: IAuthService = container.resolve(
      TokenIOC.AuthServiceToken
    )
  ) {}

  @Post("/singin", { transformResponse: true })
  @HttpCode(200)
  @ResponseSchema(SingInDTO)
  public SingIn(@Body() data: SingInInput) {
    return this.AuthService.singin(data);
  }
}

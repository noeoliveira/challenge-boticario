import { Post, JsonController, Body, HttpCode } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { container } from "tsyringe";
import {
  IAuthService,
  SingInDTO,
  SingInInput,
} from "../../application/AuthService";
import { TokenIOC } from "../../shared";

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

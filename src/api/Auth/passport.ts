import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { container } from "tsyringe";
import { IConsultantService } from "../../application/ConsultantService";
import { env, TokenIOC } from "../../shared";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET,
};

export class PassportAuth {
  public PassportAuth;
  constructor(
    private readonly consultantService: IConsultantService = container.resolve(
      TokenIOC.ConsultantServiceToken
    )
  ) {
    passport.use(
      new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
          const consultant = await consultantService.findByCpf(jwtPayload.cpf);

          if (consultant) {
            return done(null, consultant);
          }
          return done(null, false);
        } catch (error) {
          return done(error, false, { message: "Token JWT invalid" });
        }
      })
    );

    this.PassportAuth = passport;
  }
}

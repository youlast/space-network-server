import User from "../../domain/structures/User";
import jwt from "jsonwebtoken";
import { ParameterizedContext } from "koa";
import AccessTokenPayload from "./AccessTokenPayload";
import UserRepository from "../../domain/repositories/auth/UserRepository";

export default class AuthValidator {
  private userRepository: UserRepository;
  private secretKey: string;

  public constructor(userRepository: UserRepository, secretKey: string) {
    this.userRepository = userRepository;
    this.secretKey = secretKey;
  }

  public validateAuth = async (
    ctx: ParameterizedContext,
    next: () => Promise<void>
  ): Promise<void> => {
    let token = ctx.request.headers.Authorization;
    if (!token) token = ctx.request.headers.authorization;

    if (!token) {
      ctx.throw(
        400,
        "Request must contain autorization header with access token"
      );
    }

    try {
      const payload: AccessTokenPayload = jwt.verify(
        token,
        this.secretKey
      ) as AccessTokenPayload;

      const user = await this.userRepository.getUserById(payload.id);

      if (!user) {
        ctx.throw(400, "Access token is not valid");
      }

      if (payload.passwordCreationTime < user.passwordCreationTime) {
        ctx.throw(400, "Access token is not valid");
      }
    } catch (e) {
      ctx.throw(400, "Access token is not valid");
    }

    next();
  };

  public getUserFromToken = async (
    ctx: ParameterizedContext
  ): Promise<User> => {
    const token = ctx.request.headers.authorization;

    const payload: AccessTokenPayload = jwt.verify(
      token,
      this.secretKey
    ) as AccessTokenPayload;

    const user = await this.userRepository.getUserById(payload.id);

    if (!user) {
      ctx.throw(500, "user is undefined");
    }

    return user;
  };

  public generateAccessToken = (user: any): string => {
    const payload: AccessTokenPayload = {
      id: user.id,
      passwordCreationTime: user.passwordCreationTime,
      authType: user.authType,
    };
    const token = jwt.sign(payload, this.secretKey, {
      expiresIn: 3600 * 24 * 365,
    });

    return token;
  };
}

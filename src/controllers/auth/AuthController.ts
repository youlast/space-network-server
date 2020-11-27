import UserRepository from "../../domain/repositories/auth/UserRepository";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import bcrypt from "bcryptjs";
import BaseController from "../BaseContoller";
import AuthValidator from "./AuthValidator";

export default class AuthController implements BaseController {
  private readonly authRepository: UserRepository;
  private readonly authValidator: AuthValidator;

  public constructor(
    authRepository: UserRepository,
    authValidator: AuthValidator
  ) {
    this.authRepository = authRepository;
    this.authValidator = authValidator;
  }

  /**
   * @override
   */
  public getRoutes = (): Router.IMiddleware => {
    return (
      new Router()
        // General
        .post("/auth/signup", this.signUp)
        .post("/auth/signin", this.signIn)
        .routes()
    );
  };

  /**
   * @api {post} /api/auth/signup /api/auth/signup
   * @apiGroup auth
   *
   * @apiParam {string} email
   * @apiParam {string} password
   * @apiParam {string} confirmPassword
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "message": "Please check your email to confirm it by link (also check junk folder)"
   *   }
   *
   * @apiErrorExample {json} Error-Response:
   * 1) Email has not been specified
   * 2) Password has not been specified
   * 3) Confirm password has not been specified
   * 4) Passwords do not match
   * 5) Password should be longer than 7 characters
   * 6) Email already exists
   */
  public signUp = async (ctx: ParameterizedContext): Promise<void> => {
    const { email, password, username } = ctx.request.body;

    if (!email) ctx.throw(400, "Email has not been specified");

    if (!password) ctx.throw(400, "Password has not been specified");

    if (!username) ctx.throw(400, "UserName has not been specified");

    if (await this.authRepository.getUserByEmail(email)) {
      ctx.throw(400, "Email already exists");
    }

    await this.authRepository.createUser(
      email,
      await this.generatHashPassword(password),
      username
    );

    ctx.body = {
      hello: "hello",
    };

    ctx.status = 200;
  };

  /**
   * @api {post} /api/auth/signin /api/auth/signin
   * @apiGroup auth
   *
   * @apiParam {string} email
   * @apiParam {string} password
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "userId": 12345,
   *     "token": "token",
   *     "username":"username"
   *   }
   *
   * @apiErrorExample {json} Error-Response:
   * 1) Email has not been specified
   * 2) Password has not been specified
   * 3) Email has not been found
   * 4) Email and password do not match
   */
  public signIn = async (ctx: ParameterizedContext): Promise<void> => {
    const { email, password } = ctx.request.body;

    if (!email) ctx.throw(400, "Email has not been specified");
    if (!password) ctx.throw(400, "Password has not been specified");

    const user = await this.authRepository.getUserByEmail(email);

    if (!user) {
      ctx.throw(400, "Email has not been found");
    }

    const isMatchEmailPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isMatchEmailPassword) {
      ctx.throw(400, "Email and password do not match");
    }

    ctx.body = {
      userId: user.id,
      token: this.authValidator.generateAccessToken(user),
      username: user.username,
    };
    ctx.status = 200;
  };

  private generatHashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
}

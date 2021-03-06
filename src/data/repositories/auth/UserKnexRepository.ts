import Knex from "knex";
import User from "../../../domain/structures/User";
import UserModel from "../../models/auth/UserModel";
import UserRepository from "../../../domain/repositories/auth/UserRepository";

export default class UserKnexRepository implements UserRepository {
  private knex: Knex;

  public constructor(knex: Knex<UserModel, Array<UserModel>>) {
    this.knex = knex;
  }

  public getUserByEmail = async (email: string): Promise<User | undefined> => {
    const userModel: UserModel = await this.knex("users")
      .where({ email })
      .first();

    if (userModel) {
      return {
        id: userModel.id,
        email: userModel.email,
        username: userModel.username,
        passwordHash: userModel.password_hash,
      };
    } else {
      return undefined;
    }
  };

  public getUserById = async (id: number): Promise<User | undefined> => {
    const userModel: UserModel = await this.knex("users").where({ id }).first();

    if (userModel) {
      return {
        id: userModel.id,
        email: userModel.email,
        username: userModel.username,
        passwordHash: userModel.password_hash,
      };
    } else {
      return undefined;
    }
  };

  public createUser = async (
    email: string,
    passwordHash: string,
    username: string
  ): Promise<User> => {
    await this.knex("users").insert({
      email,
      username: username,
      password_hash: passwordHash,
    });

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw Error("User have not been created. Please try again");
    }

    return user;
  };

  public confirmEmail = async (confirmationCode: string): Promise<User> => {
    const rows = await this.knex("users").where({
      confirmation_code: confirmationCode,
    });

    if (rows.length <= 0) {
      throw new Error("Confirmation code has not been found");
    }

    await this.knex("users")
      .where({
        confirmation_code: confirmationCode,
        auth_type: "email",
      })
      .update({
        confirmation_code: "",
        is_confirmed: true,
      });

    const userModel: UserModel = rows[0];
    return {
      id: userModel.id,
      email: userModel.email,
      username: userModel.username,
      passwordHash: userModel.password_hash,
    };
  };
}

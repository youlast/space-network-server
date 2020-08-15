import User from "../../structures/User";

export default interface UserRepository {
  getUserByEmail(email: string): Promise<any | undefined>;

  getUserById(id: number): Promise<any | undefined>;

  createUser(
    email: string,
    passwordHash: string,
    username: string
  ): Promise<User>;
}

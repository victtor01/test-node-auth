import { User } from "../entities/user";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  store(data: User): Promise<User>;
}

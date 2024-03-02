import { User } from "../entities/User";

export interface IUserReposity {
  findByEmail(email: string): Promise<User>;
  store(data: User): Promise<User>;
}

import { User } from "./user";
import { v4 as uuidv4 } from "uuid";

describe("teste user entity", () => {
  it("teste instance of user entityd", () => {
    const createUser: Omit<User, "id"> = new User(
      {
        email: "teste2@gmail.com",
        name: "teste2",
        password: "test",
      },
      uuidv4()
    );

    expect(createUser).toBeInstanceOf(User);
  });
});

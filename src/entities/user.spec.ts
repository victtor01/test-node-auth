import { User } from "./user";

describe("teste user entity", () => {
  it("teste instance of user entityd", () => {
    // create new entity user
    const createUser: Omit<User, "id"> = new User({
      email: "teste2@gmail.com",
      name: "teste2",
      password: "test",
    });

    // test
    expect(createUser).toBeInstanceOf(User);
  });
});

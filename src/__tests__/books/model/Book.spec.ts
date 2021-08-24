import { validate } from "uuid";

import { Book } from "../../../modules/books/model/Book";

describe("Book model", () => {
  it("should be able to create a new book with all properties", () => {
    const book = new Book();

    Object.assign(book, {
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      athor: "James Clear",
      created_at: new Date(),
      deleted_at: new Date(),
    });

    expect(book).toMatchObject({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      athor: "James Clear",
    });
    expect(validate(book.id)).toBe(true);
    expect(book.created_at).toBeInstanceOf(Date);
    expect(book.updated_at).toBeInstanceOf(Date);
  });
});

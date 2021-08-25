import { validate } from "uuid";

import { BooksRepository } from "../../../modules/books/repositories/implementations/BooksRepository";

describe("BooksRepository", () => {
  let booksRepository: BooksRepository;

  beforeAll(() => {
    booksRepository = BooksRepository.getInstance();
  });

  it("should be able to create new books", () => {
    const book = booksRepository.create({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });

    expect(book).toMatchObject({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });
    expect(validate(book.id)).toBe(true);
    expect(book.created_at).toBeInstanceOf(Date);
    expect(book.updated_at).toBeInstanceOf(Date);
  });

  it("should be able to list all books", () => {
    const book = booksRepository.create({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });
    const books = booksRepository.list();

    expect(books).toStrictEqual(expect.arrayContaining([book]));
  });

  it("should be able to find a book by ID", () => {
    const book = booksRepository.create({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });

    const findBook = booksRepository.findById(book.id);

    expect(findBook).toMatchObject({
      name: book.name,
      description: book.description,
      author: book.author,
    });
    expect(validate(findBook?.id as string)).toBe(true);
    expect(findBook?.created_at).toBeInstanceOf(Date);
    expect(findBook?.updated_at).toBeInstanceOf(Date);
  });

  it("should be able to find book by name", () => {
    const book = booksRepository.create({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });

    const findBook = booksRepository.findByName(book.name);

    expect(findBook).toMatchObject({
      name: book.name,
      description: book.description,
      author: book.author,
    });
    expect(validate(findBook?.id as string)).toBe(true);
    expect(findBook?.created_at).toBeInstanceOf(Date);
    expect(findBook?.updated_at).toBeInstanceOf(Date);
  });
});

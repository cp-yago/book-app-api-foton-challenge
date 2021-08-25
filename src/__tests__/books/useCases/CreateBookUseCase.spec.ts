import { BooksRepository } from "../../../modules/books/repositories/implementations/BooksRepository";
import { CreateBookUseCase } from "../../../modules/books/useCases/createBook/CreateBookUseCase";

describe("CreateBookUseCase", () => {
  let booksRepository: BooksRepository;
  let createBookUseCase: CreateBookUseCase;

  beforeAll(() => {
    booksRepository = BooksRepository.getInstance();
    createBookUseCase = new CreateBookUseCase(booksRepository);
  });

  it("should be able to create new books", () => {
    const book = createBookUseCase.execute({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: '"James Clear"',
    });

    expect(booksRepository.list()).toStrictEqual([book]);
  });

  it("should not be able to create new books if name already exists", () => {
    expect(() => {
      createBookUseCase.execute({
        name: "Atomic Habits",
        description:
          "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        author: '"James Clear"',
      });
    }).toThrow();
  });
});

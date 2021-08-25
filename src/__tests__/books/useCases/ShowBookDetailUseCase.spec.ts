import { v4 as uuidv4 } from "uuid";

import { BooksRepository } from "../../../modules/books/repositories/implementations/BooksRepository";
import { ShowBookDetailsUseCase } from "../../../modules/books/useCases/showBookDetail/ShowBookDetailUseCase";

describe("ShowBookDetailUseCase", () => {
  let booksRepository: BooksRepository;
  let showBookDetailsUseCase: ShowBookDetailsUseCase;

  beforeAll(() => {
    booksRepository = BooksRepository.getInstance();
    showBookDetailsUseCase = new ShowBookDetailsUseCase(booksRepository);
  });

  it("should be able to get book details", () => {
    const book = booksRepository.create({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: '"James Clear"',
    });

    const findBook = showBookDetailsUseCase.execute({ book_id: book.id });

    expect(findBook).toMatchObject(book);
  });

  it("should not be able to list the detail of a non existing book", () => {
    expect(() => {
      showBookDetailsUseCase.execute({ book_id: uuidv4() });
    }).toThrow();
  });
});

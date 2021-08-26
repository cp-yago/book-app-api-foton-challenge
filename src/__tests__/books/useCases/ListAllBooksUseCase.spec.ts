import { BooksRepository } from "../../../modules/books/repositories/implementations/BooksRepository";
import { ListAllBooksUseCase } from "../../../modules/books/useCases/listBooks/ListAllBooksUseCase";

describe("ListAllBooksUseCase", () => {
  let booksRepository: BooksRepository;
  let listAllBooksUseCase: ListAllBooksUseCase;

  beforeAll(() => {
    booksRepository = BooksRepository.getInstance();
    listAllBooksUseCase = new ListAllBooksUseCase(booksRepository);
  });

  it("should be able to list all books", () => {
    const book1 = booksRepository.create({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });

    const book2 = booksRepository.create({
      name: "Feitas Para Crescer",
      description:
        "Como o Intraempreendedorismo Pode Promover a Inovação e o Desenvolvimento das Empresas",
      author: "Chris Kuenne, John Danner",
    });

    const books = listAllBooksUseCase.execute({});

    expect(books).toEqual(expect.arrayContaining([book1, book2]));
  });
});

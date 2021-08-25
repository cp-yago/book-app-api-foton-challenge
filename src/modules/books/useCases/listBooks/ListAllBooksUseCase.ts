import { Book } from "../../model/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

type IRequest = Partial<Book>;

class ListAllBooksUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  execute(query: IRequest): Book[] {
    const books = this.booksRepository.list(query);

    return books;
  }
}

export { ListAllBooksUseCase };

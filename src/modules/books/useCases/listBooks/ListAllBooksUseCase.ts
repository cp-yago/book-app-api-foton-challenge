import { IListBookOptions } from "../../interfaces/IListBooksQuery";
import { Book } from "../../model/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

type IRequest = Partial<Book>;

class ListAllBooksUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  execute(query: IRequest & IListBookOptions): Book[] {
    const books = this.booksRepository.list(query);

    return books;
  }
}

export { ListAllBooksUseCase };

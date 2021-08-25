import { Book } from "../../model/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

class ListAllBooksUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  execute(): Book[] {
    return this.booksRepository.list();
  }
}

export { ListAllBooksUseCase };

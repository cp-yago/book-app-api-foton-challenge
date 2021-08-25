import { Book } from "../../model/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

interface IRequest {
  book_id: string;
}

class ShowBookDetailsUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  execute({ book_id }: IRequest): Book | undefined {
    const book = this.booksRepository.findById(book_id);

    if (!book) {
      throw new Error("Book does not exist!");
    }

    return book;
  }
}

export { ShowBookDetailsUseCase };

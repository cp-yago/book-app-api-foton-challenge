import { Book } from "../../model/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

interface IRequest {
  name: string;
  description: string;
  author: string;
}

class CreateBookUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  execute({ name, description, author }: IRequest): Book {
    const bookAlreadyExists = this.booksRepository.findByName(name);

    if (bookAlreadyExists) {
      throw new Error("Book already exists!");
    }

    return this.booksRepository.create({
      name,
      description,
      author,
    });
  }
}

export { CreateBookUseCase };

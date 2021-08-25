import { BooksRepository } from "../../repositories/implementations/BooksRepository";
import { CreateBookController } from "./CreateBookController";
import { CreateBookUseCase } from "./CreateBookUseCase";

const booksRepository = BooksRepository.getInstance();
const createBookUseCase = new CreateBookUseCase(booksRepository);
const createBookController = new CreateBookController(createBookUseCase);

export { createBookController };

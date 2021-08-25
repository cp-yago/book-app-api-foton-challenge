import { BooksRepository } from "../../repositories/implementations/BooksRepository";
import { ListAllBookController } from "./ListAllBooksController";
import { ListAllBooksUseCase } from "./ListAllBooksUseCase";

const booksRepository = BooksRepository.getInstance();
const listAllBooksUseCase = new ListAllBooksUseCase(booksRepository);
const listAllBooksController = new ListAllBookController(listAllBooksUseCase);

export { listAllBooksController };

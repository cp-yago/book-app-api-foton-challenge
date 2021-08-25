import { BooksRepository } from "../../repositories/implementations/BooksRepository";
import { ShowBookDetailController } from "./ShowBookDetailController";
import { ShowBookDetailsUseCase } from "./ShowBookDetailUseCase";

const booksRepository = BooksRepository.getInstance();
const showBookDetailsUseCase = new ShowBookDetailsUseCase(booksRepository);
const showBookDetailController = new ShowBookDetailController(
  showBookDetailsUseCase
);

export { showBookDetailController };

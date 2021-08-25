import { Router } from "express";

import { createBookController } from "../modules/books/useCases/createBook";
import { listAllBooksController } from "../modules/books/useCases/listBooks";
import { showBookDetailController } from "../modules/books/useCases/showBookDetail";

const booksRoutes = Router();

booksRoutes.post("/", (request, response) =>
  createBookController.handle(request, response)
);

booksRoutes.get("/", (request, response) =>
  listAllBooksController.handle(request, response)
);

booksRoutes.get("/:book_id", (request, response) =>
  showBookDetailController.handle(request, response)
);

export { booksRoutes };

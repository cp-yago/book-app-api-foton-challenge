import { Request, Response } from "express";

import { ListAllBooksUseCase } from "./ListAllBooksUseCase";

class ListAllBookController {
  constructor(private listAllBooksUseCase: ListAllBooksUseCase) {}

  handle(request: Request, response: Response): Response {
    const { query } = request;

    try {
      const books = this.listAllBooksUseCase.execute(query);

      return response.status(201).json(books);
    } catch (e) {
      return response.status(400).send({ error: e.message });
    }
  }
}

export { ListAllBookController };

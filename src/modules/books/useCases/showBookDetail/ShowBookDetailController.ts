import { Request, Response } from "express";

import { ShowBookDetailsUseCase } from "./ShowBookDetailUseCase";

class ShowBookDetailController {
  constructor(private showBookDetailsUseCase: ShowBookDetailsUseCase) {}

  handle(request: Request, response: Response): Response {
    const { book_id } = request.params;

    try {
      const book = this.showBookDetailsUseCase.execute({ book_id });

      return response.status(201).json(book);
    } catch (e) {
      return response.status(400).send({ error: e.message });
    }
  }
}

export { ShowBookDetailController };

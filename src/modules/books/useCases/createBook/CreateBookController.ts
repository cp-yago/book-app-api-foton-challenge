import { Request, Response } from "express";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
  constructor(private createBookUseCase: CreateBookUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description, author } = request.body;
    try {
      const book = this.createBookUseCase.execute({
        name,
        description,
        author,
      });

      return response.status(201).json(book);
    } catch (e) {
      return response.status(400).send({ error: e.message });
    }
  }
}

export { CreateBookController };

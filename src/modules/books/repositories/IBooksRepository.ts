import { Book } from "../model/Book";

interface ICreateBookDTO {
  name: string;
  description: string;
  author: string;
}

interface IBooksRepository {
  create({ name, description, author }: ICreateBookDTO): Book;
  list(): Book[];
  findById(id: string): Book | undefined;
  findByName(name: string): Book | undefined;
}

export { ICreateBookDTO, IBooksRepository };

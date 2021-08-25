import { v4 as uuidv4 } from "uuid";

import { Book } from "../../model/Book";
import { IBooksRepository, ICreateBookDTO } from "../IBooksRepository";

class BooksRepository implements IBooksRepository {
  private books: Book[];

  private static INSTANCE: BooksRepository;

  private constructor() {
    this.books = [];
  }

  public static getInstance(): BooksRepository {
    if (!BooksRepository.INSTANCE) {
      BooksRepository.INSTANCE = new BooksRepository();
    }

    return BooksRepository.INSTANCE;
  }

  create({ name, description, author }: ICreateBookDTO): Book {
    const book = new Book();

    Object.assign(book, {
      name,
      description,
      author,
    });

    this.books.push(book);
    return book;
  }

  list(): Book[] {
    return this.books;
  }

  findById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  findByName(name: string): Book | undefined {
    return this.books.find((book) => book.name === name);
  }
}

export { BooksRepository };

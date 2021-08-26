/* eslint-disable radix */
import {
  IListBooksQuery,
  IListBookOptions,
} from "../../interfaces/IListBooksQuery";
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

  list(query: IListBooksQuery & IListBookOptions): Book[] {
    const { page = 0, pageLimit = 9, ...queryParams } = query;

    const queryKeys = Object.keys(queryParams) as [keyof Book];

    const filteredBooks = this.books.filter((book) => {
      const foundByQueryItem: Book[] = [];

      queryKeys.forEach((key) => {
        const valueToSearch = query[key]?.toString().toLowerCase().trim();
        const bookValue = book[key]?.toString().toLowerCase().trim();

        if (bookValue.includes(valueToSearch as string)) {
          foundByQueryItem.push(book);
        }
      });

      return foundByQueryItem.length === queryKeys.length;
    });

    if (page && pageLimit) {
      return filteredBooks.slice(page, pageLimit);
    }

    return filteredBooks;
  }

  findById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  findByName(name: string): Book | undefined {
    return this.books.find((book) => book.name === name);
  }
}

export { BooksRepository };

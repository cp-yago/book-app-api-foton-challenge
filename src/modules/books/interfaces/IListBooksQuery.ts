import { Book } from "../model/Book";

export type IListBooksQuery = Partial<Book>;

export type IListBookOptions = {
  page?: number;
  pageLimit?: number;
};

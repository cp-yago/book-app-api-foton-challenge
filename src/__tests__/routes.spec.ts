import request from "supertest";
import { v4 as uuidv4 } from "uuid";

import { BooksRepository } from "../modules/books/repositories/implementations/BooksRepository";
import { app } from "../server";

describe("[POST] /books", () => {
  it("should be able to create new books", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        name: "Atomic Habits",
        description:
          "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        author: "James Clear",
      })
      .expect(201);

    expect(response.body).toMatchObject({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });
  });

  it("should not be able to create new books if name already exists", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        name: "Atomic Habits",
        description:
          "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        author: "James Clear",
      })
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });
});

describe("[GET] /books", () => {
  it("should be able to list all books", async () => {
    const booksRepository = BooksRepository.getInstance();

    const book1 = booksRepository.create({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });

    const book2 = booksRepository.create({
      name: "Feitas Para Crescer",
      description:
        "Como o Intraempreendedorismo Pode Promover a Inovação e o Desenvolvimento das Empresas",
      author: "Chris Kuenne, John Danner",
    });

    const response = await request(app).get("/books");

    expect(
      response.body.map((res: any) => ({
        ...res,
        created_at: new Date(res.created_at),
        updated_at: new Date(res.updated_at),
      }))
    ).toEqual(expect.arrayContaining([book1, book2]));
  });
});

describe("[GET] /books/:book_id", () => {
  it("should be able to get book detail by ID", async () => {
    const booksRepository = BooksRepository.getInstance();

    const book = booksRepository.create({
      name: "Atomic Habits",
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
    });

    const response = await request(app).get(`/books/${book.id}`);

    const parsedResponse = {
      ...response.body,
      created_at: new Date(response.body.created_at),
      updated_at: new Date(response.body.updated_at),
    };

    expect(parsedResponse).toMatchObject({
      ...book,
      created_at: book.created_at,
      updated_at: book.updated_at,
    });
  });

  it("should not be able to show book details of a non existing book", async () => {
    const response = await request(app).get(`/books/${uuidv4()}`).expect(400);

    expect(response.body.error).toBeTruthy();
  });
});

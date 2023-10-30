import { Request, Response, NextFunction } from "express";
import BookModel from "../models/book.model";
import {
  CreateBookInput,
  ParamsInput,
  UpdateBookInput,
} from "../schemas/book.schema";

//Create a new book
export const createBookController = async (
  req: Request<{}, {}, CreateBookInput>,
  res: Response,
  next: NextFunction
) => {
  const { title, author, summary } = req.body;
  try {
    const book = new BookModel({ title, author, summary });
    await book.save();
    res.status(201).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Book already exist",
      });
    }
    next(err);
  }
};

//Get all books
export const findAllBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await BookModel.find({});
    res.status(200).json({
      status: "success",
      result: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    next(err);
  }
};
//Get book by ID
export const findBookController = async (
  req: Request<ParamsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await BookModel.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book with that ID not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
//Update a book
export const updateBookController = async (
  req: Request<UpdateBookInput["params"], {}, UpdateBookInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, summary } = req.body;
    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.bookId,
      { title, author, summary },
      { new: true } // Return the updated post
    );

    if (!updatedBook) {
      return res.status(404).json({
        status: "fail",
        message: "Book with that ID not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        updatedBook,
      },
    });
  } catch (err) {
    next(err);
  }
};
//Delete a book
export const deleteBookController = async (
  req: Request<ParamsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await BookModel.findByIdAndDelete(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book with that ID not found",
      });
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

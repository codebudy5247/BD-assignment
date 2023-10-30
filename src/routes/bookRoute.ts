import express from "express";
import { validate } from "../middleware/validate";
import {
  createBookController,
  findAllBooksController,
  findBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/book.controller";
import { createBookSchema, updateBookSchema } from "../schemas/book.schema";

const router = express.Router();

router
  .route("/")
  .get(findAllBooksController)
  .post(validate(createBookSchema), createBookController);

router
  .route("/:bookId")
  .get(findBookController)
  .patch(validate(updateBookSchema), updateBookController)
  .delete(deleteBookController);

export default router;

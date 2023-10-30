import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the Book class to be used as TypeScript type
export class Book {
  @prop({ unique: true, required: true })
  title: string;

  @prop({ required: true })
  author: string;

  @prop({ required: true, minlength: 10, maxLength: 250 })
  summary: string;
}

// Create the book model from the Book class
const bookModel = getModelForClass(Book);
export default bookModel;

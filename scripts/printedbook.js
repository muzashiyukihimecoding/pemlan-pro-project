import { Book } from "./book.js";

export class PrintedBook extends Book {
   constructor(title, author, category) {
      super(title, author, category, "Printed");
   }
}

export default PrintedBook;

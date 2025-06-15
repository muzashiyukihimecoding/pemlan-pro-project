import { Book } from "./book.js";

class Ebook extends Book {
   constructor(title, author, category) {
      super(title, author, category, "E-book");
   }
}

export default Ebook;

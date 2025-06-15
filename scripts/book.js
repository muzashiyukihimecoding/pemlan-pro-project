class Book {
   static totalBooks = 0;
   // Static Property for counting total books

   constructor(title, author, category, type) {
      this.code = String(Book.totalBooks + 1).padStart(4, "0");
      // Ini untuk membuat kode buku
      this.title = title;
      this.author = author;
      this.category = category;
      this.type = type;
      Book.totalBooks++;
   }
}

export default Book;

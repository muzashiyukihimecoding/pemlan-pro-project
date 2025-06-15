import Book from "./book.js";
import Ebook from "./ebook.js";
import PrintedBook from "./printedbook.js";

let books = [];
let editingIndex = null;

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const categoryInput = document.getElementById("category");
const typeInput = document.getElementById("type");

const saveBtn = document.getElementById("simpan-buku");
const tableBody = document.getElementById("book-list");
const totalEbookSpan = document.getElementById("total-ebook");
const totalPrintedSpan = document.getElementById("total-printed");

function resetForm() {
   titleInput.value = "";
   authorInput.value = "";
   categoryInput.value = "";
   typeInput.value = "";
   editingIndex = null;
}

function updateCounts() {
   const ebookCount = books.filter((b) => b.type === "E-book").length;
   const printedCount = books.filter((b) => b.type === "Printed Book").length;
   totalEbookSpan.textContent = ebookCount;
   totalPrintedSpan.textContent = printedCount;
   console.log(`Total Buku: ${Book.totalBooks}`);
}

function renderTable() {
   tableBody.innerHTML = "";
   books.forEach((book, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
         <td>${index + 1}</td>
         <td>${book.code}</td>
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.category}</td>
         <td>${book.type}</td>
         <td>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Hapus</button>
         </td>
      `;
      tableBody.appendChild(row);
   });

   // Event listener delete/edit
   tableBody.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
         const index = e.target.dataset.index;
         if (confirm("Yakin ingin hapus buku ini?")) {
            books.splice(index, 1);
            Book.totalBooks--;
            renderTable();
            updateCounts();
         }
      })
   );

   tableBody.querySelectorAll(".edit-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
         const index = e.target.dataset.index;
         const book = books[index];
         titleInput.value = book.title;
         authorInput.value = book.author;
         categoryInput.value = book.category;
         typeInput.value = book.type === "Printed" ? "printed" : "e-book";
         editingIndex = index;
      })
   );
}

saveBtn.addEventListener("click", (e) => {
   e.preventDefault();

   const title = titleInput.value.trim();
   const author = authorInput.value.trim();
   const category = categoryInput.value.trim();
   const type = typeInput.value;

   if (!title || !author || !category || !type) {
      alert("Semua field harus diisi!");
      return;
   }

   let newBook =
      type === "printed"
         ? new PrintedBook(title, author, category)
         : new Ebook(title, author, category);

   if (editingIndex !== null) {
      books[editingIndex] = newBook;
      editingIndex = null;
   } else {
      books.push(newBook);
   }

   resetForm();
   renderTable();
   updateCounts();
});

// Search fitur
["search-code", "search-title", "search-author"].forEach((id) =>
   document.getElementById(id).addEventListener("input", searchBooks)
);

function searchBooks() {
   const codeSearch = document
      .getElementById("search-code")
      .value.toLowerCase();
   const titleSearch = document
      .getElementById("search-title")
      .value.toLowerCase();
   const authorSearch = document
      .getElementById("search-author")
      .value.toLowerCase();

   const rows = tableBody.querySelectorAll("tr");
   rows.forEach((row) => {
      const code = row.cells[1].textContent.toLowerCase();
      const title = row.cells[2].textContent.toLowerCase();
      const author = row.cells[3].textContent.toLowerCase();

      if (
         code.includes(codeSearch) &&
         title.includes(titleSearch) &&
         author.includes(authorSearch)
      ) {
         row.style.display = "";
      } else {
         row.style.display = "none";
      }
   });
}

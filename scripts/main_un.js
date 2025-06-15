import { PrintedBook } from "./printedbook.js";
import { Ebook } from "./ebook.js";

let books = [];
let editingIndex = null;

const judulInput = document.getElementById("judul");
const penulisInput = document.getElementById("penulis");
const kategoriInput = document.getElementById("kategori");
const tipeInput = document.getElementById("tipe");

const simpanBtn = document.getElementById("simpan-buku");
const tableBody = document.getElementById("tabel-buku");
const totalEbookSpan = document.getElementById("total-ebook");
const totalPrintedSpan = document.getElementById("total-printed");

function resetForm() {
   judulInput.value = "";
   penulisInput.value = "";
   kategoriInput.value = "";
   tipeInput.value = "";
   editingIndex = null;
}

function updateCounts() {
   const ebookCount = books.filter((book) => book.type === "E-book").length;
   const printedCount = books.filter((book) => book.type === "Printed").length;
   totalEbookSpan.textContent = ebookCount;
   totalPrintedSpan.textContent = printedCount;
}

function renderTable() {
   tableBody.innerHTML = "";
   book.foreach((book, index) => {
      const row = documents.createElement("tr");
      row.innerHTML = `
         <td>${index + 1}</td>
         <td>${book.judul}</td>
         <td>${book.penulis}</td>
         <td>${book.kategori}</td>
         <td>${book.type}</td>
         <td>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Hapus</button>
         </td>
      `;
      tableBody.appendChild(row);
   });
   updateCounts();
}

simpanBtn.addEventListener("click", () => {
   const judul = judulInput.value;
   const penulis = penulisInput.value;
   const kategori = kategoriInput.value;
   const tipe = tipeInput.value;

   if (!judul || !penulis || !kategori || !tipe) {
      alert("Semua field harus diisi!");
      return;
   }

   const newBook =
      tipe === "Printed Book"
         ? new PrintedBook(judul, penulis, kategori)
         : new Ebook(judul, penulis, kategori);
   books.push(newBook);

   if (editingIndex !== null) {
      books[editingIndex] = newBook;
   } else {
      books.push(newBook);
   }

   resetForm();
   renderTable();
});

window.deleteBook = function (index) {
   if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      books.splice(index, 1);
      renderTable();
   }
};

window.editBook = function (index) {
   const book = books[index];
   judulInput.value = book.judul;
   penulisInput.value = book.penulis;
   kategoriInput.value = book.kategori;
   tipeInput.value = book.type === "Printed" ? "Printed Book" : "E-book";
   editingIndex = index;
};

document.addEventListener("DOMContentLoaded", function () {
  const addBookBtn = document.querySelector(".add-book-btn");
  const modal = document.getElementById("addBookModal");
  const addBookForm = document.getElementById("addBookForm");
  const booksContainer = document.querySelector(".books-container");

  let myLibrary = [];

  // Open modal when add book button is clicked
  addBookBtn.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  // Close modal when clicking outside the modal content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle form submission
  addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    let newBook = {
      title,
      author,
      pages,
      read,
    };

    myLibrary.push(newBook);
    displayBooks();

    // Reset form and close modal
    addBookForm.reset();
    modal.style.display = "none";
  });

  // Display all books in the library
  function displayBooks() {
    booksContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";

      bookCard.innerHTML = `
                        <div class="book-title">"${book.title}"</div>
                        <div class="book-author">${book.author}</div>
                        <div class="book-pages">${book.pages} pages</div>
                        <div class="book-read ${
                          book.read ? "read" : ""
                        }" data-index="${index}">
                            ${book.read ? "Read" : "Not read"}
                        </div>
                        <div class="book-remove" data-index="${index}">Remove</div>
                    `;

      booksContainer.appendChild(bookCard);
    });

    // Add event listeners to read status buttons
    document.querySelectorAll(".book-read").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        myLibrary[index].read = !myLibrary[index].read;
        displayBooks();
      });
    });

    // Add event listeners to remove buttons
    document.querySelectorAll(".book-remove").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        myLibrary.splice(index, 1);
        displayBooks();
      });
    });
  }
});

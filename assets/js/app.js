let books = [];
const addBook = (title, author, isbn, publicationDate, genre) => {
  const newBook = { title, author, isbn, publicationDate, genre };
  books.push(newBook);
  displayBooks();
};

const editBook = (isbn) => {
  const bookIndex = books.findIndex(book => book.isbn === isbn);
  if (bookIndex !== -1) {
    const book = books[bookIndex];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('isbn').value = book.isbn;
    document.getElementById('Publication_Date').value = book.publicationDate;
    document.getElementById('genre').value = book.genre;
    books.splice(bookIndex, 1);
    displayBooks();
  }
};

const deleteBook = (isbn) => {
  books = books.filter(book => book.isbn !== isbn);
  displayBooks();
};

const displayBooks = () => {
  const tableBody = document.getElementById('bookTableBody');
  tableBody.innerHTML = '';

  books.forEach((book) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.publicationDate}</td>
      <td>${book.genre}</td>
      <td>
        <button class="edit-btn" onclick="editBook('${book.isbn}')">Edit</button>
        <button class="delete-btn" onclick="deleteBook('${book.isbn}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
};

const form = document.getElementById('formField');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const isbn = document.getElementById('isbn').value.trim();
  const publicationDate = document.getElementById('Publication_Date').value;
  const genre = document.getElementById('genre').value;
console.log(isbn);

  let errorMsg = '';
  if (title== ''||author=='' || isbn== '' || publicationDate== '' || genre=='') {
    errorMsg += 'All fields are mandatory.\n';
  }

  if (isNaN(isbn) || (isbn.length != 13 ))  {
    errorMsg += 'ISBN must be a 13 Digit number.\n';
  }

  const today = new Date().toISOString().split('T')[0];
  if (publicationDate > today) {
    errorMsg += 'Publication Date cannot be in the future.\n';
  }

  if (errorMsg) {
    alert(errorMsg);       
    return;
  }
  alert('Form submitted successfully!');
  addBook(title, author, isbn, publicationDate, genre);
  form.reset();
});
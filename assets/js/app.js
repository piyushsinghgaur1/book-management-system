let books = [];
const addBook = (title, author, isbn, publicationDate, genre) => {
  const newBook = { title, author, isbn, publicationDate, genre };
  books.push(newBook);
  displayBooks();
};

const calculateBookAge = (publicationDate) => {
  const currentDate = new Date();
  const pubDate = new Date(publicationDate);

  let years = currentDate.getFullYear() - pubDate.getFullYear();
  let months = currentDate.getMonth() - pubDate.getMonth();
  let days = currentDate.getDate() - pubDate.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(pubDate.getFullYear(), pubDate.getMonth() + 1, 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${years} years, ${months} months, ${days} days`;
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
  const selectedGenre = document.getElementById('genreFilter').value;
  tableBody.innerHTML = '';
  const filteredBooks = selectedGenre === 'all' ? books : books.filter(book => book.genre === selectedGenre); 

  filteredBooks.forEach((book) => {
    const bookAge = calculateBookAge(book.publicationDate);    
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.publicationDate}</td>
      <td>${book.genre}</td>
      <td>${bookAge} </td>
      <td>
        <button class="edit-btn" onclick="editBook('${book.isbn}')">Edit</button>
        <button class="delete-btn" onclick="deleteBook('${book.isbn}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
};
document.getElementById('genreFilter').addEventListener('change', displayBooks);

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
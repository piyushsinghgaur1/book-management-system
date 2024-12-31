books=[];
class BookManager {
  constructor() {
    this.tableBody = document.getElementById('bookTableBody');
    this.genreFilter = document.getElementById('genreFilter');
    this.searchField = document.getElementById('searchID');
  }

  addBook(title, author, isbn, publicationDate, price, genre) {
    const newBook = { title, author, isbn, publicationDate, price, genre };
    books.unshift(newBook);
    this.displayBooks();
  }

  deleteBook(isbn) {
    books = books.filter(book => book.isbn !== isbn);
    setTimeout(() => {
      alert('Book deleted successfully!');
      },100);
    this.displayBooks();
    
  }

  editBook(isbn) {
    const bookIndex = books.findIndex(book => book.isbn === isbn);
    if (bookIndex !== -1) {
      const book = books[bookIndex];
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author;
      document.getElementById('isbn').value = book.isbn;
      document.getElementById('Publication_Date').value = book.publicationDate;
      document.getElementById('price').value = book.price;
      document.getElementById('genre').value = book.genre;
      books.splice(bookIndex, 1);
      this.displayBooks();
    }
  }

  calculateBookAge(publicationDate) {
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
  }

  filterBooks() {
    const selectedGenre = this.genreFilter.value;
    const searchValue = this.searchField.value.toLowerCase();
    return books.filter(book => {
      const matchesGenre = selectedGenre === 'all' || book.genre.toLowerCase().includes(selectedGenre);
      const matchesSearch = book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue) ||
        book.isbn.toLowerCase().includes(searchValue);
      return matchesGenre && matchesSearch;
    });
  }

  displayBooks() {
    const filteredBooks = this.filterBooks();
    this.tableBody.innerHTML = '';

    filteredBooks.forEach(book => {
      const bookAge = book.publicationDate ? this.calculateBookAge(book.publicationDate) : 'N/A';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.publicationDate}</td>
        <td>${book.price}</td>
        <td>${book.genre}</td>
        <td>${bookAge}</td>
        <td>
          <button class="edit-btn" onclick="bookManager.editBook('${book.isbn}')">Edit</button>
          <button class="delete-btn" onclick="bookManager.deleteBook('${book.isbn}')">Delete</button>
        </td>
      `;
      this.tableBody.appendChild(row);
    });

    if (filteredBooks.length === 0) {
      this.tableBody.innerHTML = "<tr><td colspan='7'>No books found</td></tr>";
    }
  }
}

// Instantiate the BookManager
const bookManager = new BookManager();

document.getElementById('genreFilter').addEventListener('change', () => bookManager.displayBooks());
document.getElementById('searchBtn').addEventListener('click', () => bookManager.displayBooks());

const form = document.getElementById('formField');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const isbn = document.getElementById('isbn').value.trim();
  const publicationDate = document.getElementById('Publication_Date').value;
  const price = document.getElementById('price').value;  
  const genre = document.getElementById('genre').value;

  let errorMsg = '';
  if (!title || !author || !isbn || !publicationDate || !genre || !price) {
    errorMsg += 'All fields are mandatory.\n';
  }

  if (isNaN(isbn) || isbn.length !== 13) {
    errorMsg += 'ISBN must be a 13-digit number.\n';
  }

  if (isNaN(price)) {
    errorMsg += 'Price must be a number.\n';
  }

  const today = new Date().toISOString().split('T')[0];
  if (publicationDate > today) {
    errorMsg += 'Publication Date cannot be in the future.\n';
  }

  if (errorMsg) {
    alert(errorMsg);
    return;
  }

  setTimeout(() => {
    alert('Book added successfully!');
    },100);
  bookManager.addBook(title, author, isbn, publicationDate, price, genre);
  form.reset();
});

books=[];
let errorMsg = '';
let bookIndex=-1;
let currentIsbn=0
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
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });
  }

  deleteBook(isbn) {
    bookIndex = books.findIndex(book => book.isbn === isbn);
    books.splice(bookIndex, 1);    
    setTimeout(()=>alert('Book deleted successfully!'),100);
    document.getElementById('submit').textContent = 'Add Book';
    document.getElementById('resetButton').textContent = 'Reset';
    document.getElementById('isbn').disabled=false;  
    this.displayBooks();    
  }
  editBook(isbn) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.getElementById('isbn').disabled=true;
    document.getElementById('submit').textContent = 'Update Book';
    document.getElementById('resetButton').textContent = 'Delete Book';
    bookIndex = books.findIndex(book => book.isbn === isbn);
    currentIsbn =isbn;
    if (bookIndex !== -1) {
      const book = books[bookIndex];
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author;
      document.getElementById('isbn').value = book.isbn;
      document.getElementById('Publication_Date').value = book.publicationDate;
      document.getElementById('price').value = book.price;
      const option = document.createElement('option');
      option.value = book.genre;
      option.text = book.genre;
      document.getElementById('genre').appendChild(option);
      document.getElementById('genre').value = book.genre;
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
  getData(){
    this.title = document.getElementById('title').value.trim();
    this.author = document.getElementById('author').value.trim();
    this.isbn = document.getElementById('isbn').value.trim();
    this.publicationDate = document.getElementById('Publication_Date').value;
    this.price = document.getElementById('price').value;  
    this.genre = document.getElementById('genre').value;
  }

  updateBook(){
    if (errorMsg) {
      errorMsg ='';
      return;
    }
    books.splice(bookIndex, 1);
    setTimeout(()=>alert('Book Updated successfully!'),100);
    bookManager.addBook(this.title, this.author, this.isbn, this.publicationDate, this.price, this.genre);
    form.reset();    
    document.getElementById('submit').textContent = 'Add Book';
    document.getElementById('resetButton').textContent = 'Reset';
    document.getElementById('isbn').disabled=false;    
  }

  addNewBook(){
    if (errorMsg) {
      errorMsg ='';
      return;
    }
    setTimeout(()=>alert('Book Added Successfully!'),100);
    bookManager.addBook(this.title, this.author, this.isbn, this.publicationDate, this.price, this.genre);
    form.reset(); 
  }

  validateBook(){
    console.log(this.title, this.author, this.isbn, this.publicationDate, this.genre, this.price);
    if (!this.title || !this.author || !this.isbn || !this.publicationDate || !this.genre || !this.price) {
      errorMsg += 'All fields are mandatory.\n';
    }

    if (isNaN(this.isbn)  && document.getElementById('submit').textContent === 'Add Book') {
      errorMsg += 'ISBN must be a 13-digit number.\n';
    }

    if (isNaN(this.price) && document.getElementById('submit').textContent === 'Add Book') {
      errorMsg += 'Price must be a number.\n';
    }

    const today = new Date().toISOString().split('T')[0];
    if (this.publicationDate > today) {
      errorMsg += 'Publication Date cannot be in the future.\n';
    }
    if (errorMsg) {
      alert(errorMsg);
      return;
    }
  }

  displayBooks() {
    const filteredBooks = this.filterBooks();
    this.tableBody.innerHTML = '';
    filteredBooks.forEach(book => {
      const bookAge = book.publicationDate ? this.calculateBookAge(book.publicationDate) : 'N/A';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="border border-gray-500 px-4 py-2">${book.title}</td>
        <td class="border border-gray-500 px-4 py-2">${book.author}</td>
        <td class="border border-gray-500 px-4 py-2">${book.isbn}</td>
        <td class="border border-gray-500 px-4 py-2">${book.publicationDate}</td>
        <td class="border border-gray-500 px-4 py-2">${book.price}</td>
        <td class="border border-gray-500 px-4 py-2">${book.genre}</td>
        <td class="border border-gray-500 px-4 py-2">${bookAge}</td>
        <td class="border border-gray-500 px-4 py-2">
        <div class="flex space-x-2">
          <button class="edit-btn bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-blue-700" onclick="bookManager.editBook('${book.isbn}')">Edit</button>
          <button class="delete-btn bg-red-500 text-white px-1 py-1 rounded-md hover:bg-red-700" onclick="bookManager.deleteBook('${book.isbn}')">Delete</button>
        </div>
          </td>  `;
      this.tableBody.appendChild(row);
    });

    if (filteredBooks.length === 0) {
      this.tableBody.innerHTML = "<tr><td colspan='7'>No books found</td></tr>";
    }
  }
}
const bookManager = new BookManager();
const form = document.getElementById('formField');


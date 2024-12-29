class APIBooksManager extends BookManager {  
  constructor(apiUrl) {
    super();
    this.apiUrl = apiUrl;
  }

  fetchBooksFromAPI() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => {
        const fetchedBooks = data.items.map(item => {
          const volumeInfo = item.volumeInfo;
          return {
            title: volumeInfo.title || 'N/A',
            author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A',
            isbn: volumeInfo.industryIdentifiers
              ? volumeInfo.industryIdentifiers[0].identifier
              : `API-${Math.random().toString(36).substr(2, 9)}`,
            publicationDate: volumeInfo.publishedDate || 'N/A',
            genre: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'N/A',
            isManual: false,
          };
        });

        // Add fetched books to the books array while avoiding duplicates
        fetchedBooks.forEach(fetchedBook => {
          if (!books.some(book => book.isbn === fetchedBook.isbn)) {
            books.push(fetchedBook);
          }
        });

        this.displayBooks();
      })
      .catch(error => console.error('Error fetching books:', error));
  }
}

// Instantiate APIBooksManager
const apiBooksManager = new APIBooksManager('https://www.googleapis.com/books/v1/volumes?q=genre:science+fiction+history+fantasy+mystery');
document.getElementById('fetchButton').addEventListener('click', () => apiBooksManager.fetchBooksFromAPI());

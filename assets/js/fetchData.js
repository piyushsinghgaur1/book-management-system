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
          const saleInfo = item.saleInfo;   
          return {
            title: volumeInfo.title || 'N/A',
            author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A',
            isbn: volumeInfo.industryIdentifiers
              ? volumeInfo.industryIdentifiers[0].identifier
              : `API-${Math.random().toString(36).substr(2, 9)}`,
            publicationDate: volumeInfo.publishedDate || 'N/A',
            price: saleInfo.saleability === "FOR_SALE" && saleInfo.listPrice
            ? saleInfo.listPrice.amount || saleInfo.listPrice.amountInMicros
            : saleInfo.saleability, 
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
      .catch(error =>{
        alert('Error fetching books from API. Please check your internet connection.'+error);
        console.error('Error fetching books:', error)
      });
  }
}

// Instantiate APIBooksManager
const apiBooksManager = new APIBooksManager(config.url.baseUrl);
document.getElementById('fetchButton').addEventListener('click', () => apiBooksManager.fetchBooksFromAPI());

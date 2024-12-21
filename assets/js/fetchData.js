const apiUrl='https://www.googleapis.com/books/v1/volumes?q=genre:science+fiction+history+fantasy+mystery';
const fetchBooksFromAPI = () => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const fetchedBooks = data.items.map((item) => {
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
      books=books.concat(fetchedBooks);
      displayBooks();
    })
    .catch((error) => console.error('Error fetching books:', error));
};
document.getElementById('fetchButton').addEventListener('click', fetchBooksFromAPI);

class SortBooks extends BookManager{
  constructor(){
    super();
  }
  sortBooksByAuthor(order = 'asc'){
    books.sort((a, b) => {
      const authorA = a.author.toLowerCase();
      const authorB = b.author.toLowerCase();
      if (authorA < authorB) {
        return -1;
      } else if (authorA > authorB) {
        return 1;
      } else {
        return 0;
      }
    });
    if (order === 'desc') {
      books.reverse();
    }
    this.displayBooks();
  }
}

const sortBooks = new SortBooks();
document.getElementById('sortAscButton').addEventListener('click', () => sortBooks.sortBooksByAuthor('asc'));
document.getElementById('sortDescButton').addEventListener('click', () => sortBooks.sortBooksByAuthor('desc'));

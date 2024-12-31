const sortBooksByAuthor = (order = 'asc') => {
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
    displayBooks(); 
  };
  
  document.getElementById('sortAscButton').addEventListener('click', () => sortBooksByAuthor('asc'));
  document.getElementById('sortDescButton').addEventListener('click', () => sortBooksByAuthor('desc'));
  
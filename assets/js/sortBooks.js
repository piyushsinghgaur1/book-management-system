class SortBooks extends APIBooksManager{
  constructor(){
    super();
  }
  sortBooks(order = 'asc'){
      let sortBy= document.getElementById('sortValue').value;
      if (sortBy==='select'){
        setTimeout(()=>alert('Please select sort by category'),100);
        return;
      }
      books.sort((a, b) => {    
      const authorA = a[sortBy].toLowerCase();
      const authorB = b[sortBy].toLowerCase();
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
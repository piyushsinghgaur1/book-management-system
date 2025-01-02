form.addEventListener('submit', (event) => {
    event.preventDefault();
    bookManager.getData();
    bookManager.validateBook();
    if(document.getElementById('submit').textContent === 'Add Book')
        bookManager.addNewBook();
    else
        bookManager.updateBook();
});
document.getElementById('genreFilter').addEventListener('change', () => bookManager.displayBooks());
document.getElementById('searchID').addEventListener('input', () => bookManager.displayBooks());
document.getElementById('searchBtn').addEventListener('click', () => bookManager.displayBooks());
document.getElementById('resetButton').addEventListener('click', () => {
    if( document.getElementById('resetButton').textContent === 'Delete Book')
        bookManager.deleteBook(currentIsbn);
    else
        alert('Form Cleared successfully!');
});
document.getElementById('sortValue').addEventListener('change', () => sortBooks.sortBooks('asc'));
document.getElementById('sortAscButton').addEventListener('click', () => sortBooks.sortBooks('asc'));
document.getElementById('sortDescButton').addEventListener('click', () => sortBooks.sortBooks('desc'));
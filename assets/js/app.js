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
  form.reset();
});
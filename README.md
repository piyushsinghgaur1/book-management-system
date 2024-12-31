# Book Management System

Book Management System that allows users to add, edit, delete, and display books. This includes features like age calculation of books, validation checks, and a genre filter.

![Landscape SS 1](<diagrams/LandScape SS1.png>)

![Landscape SS 2](<diagrams/LandScape SS2.png>)

![Portrait SS 1](<diagrams/Portrait SS1.png>) ![Portrait SS2](<diagrams/Portrait SS2.png>)

# Folder structure
        book-management-system/
        ├── assets/
        │   ├── css/
        │   │   └── style.css
        │   ├── js/
        │   │   └── app.js
        │   │   └── config.js
        │   │   └── fetchData.js
        │   │   └── sortBooks.js        
        ├── diagram/
        │   ├── 3-tier-architecture
        │   ├── client-server-architecture
        │   └── Landscape SS1
        │   └── Landscape SS2
        │   └── Portrait SS1
        │   └── Portrait SS2
        └── README.md

# Features

## 1. Add Books
Enter book details such as Title, Author, ISBN, Publication Date, and Genre.
Validates all input fields.

## 2. Edit and Delete Books.
Modify existing book details using the Edit button.
Remove books from the table using the Delete button.


## 3. Book Age Calculation
Calculates and displays the age of the book in X years, Y months, Z days format.


## 4. Genre Filter
Filter books based on their Genre using a dropdown.
"All" is selected by default to display all books.


## 5. Input Validations
ISBN must be a 13-digit number.
Publication Date cannot be a future date.
All fields are mandatory.


## 6. Fetch Book from External API
The application fetches book data from an external API and displays it in a table.

## 7. Search & Filtering Functionality
Users can search for books by title or author or ISBN using a search bar. The search results are displayed dynamically as the user types and categorize according to genre.

## 8. Error Handling
If a request to fetch the books fails (e.g., due to a network error), the application will perfectly handle the error.

## 9. Talwind Integration
Style the form and book list using Tailwind CSS.

## 10. Sorting of Books
Sorting of the books based on the Author.

## 11. Add/ Fetch Price of Books
Sorting of the books based on the Author.


# Technologies Used
HTML || CSS || JAVASCRIPT || Tailwind CSS

# Setup Instructions
Clone this repository or download the code files.

git clone https://github.com/piyushsinghgaur1/book-management-system.git

# How to Run the Project
Open the index.html file in your browser.

# Phases in a Book Management System development process
1. Requirements Phase
Objective: Identify the features needed for the system.
Example:
Functional: Add, edit, delete books; search books by title/author/isbn.

2. Design Phase
Objective: Plan how the system will be structured and operate.
Example:
Architecture: 3-tier (UI, Business Logic, Database).
Database: Tables for Books, Users, Borrowing Records.

3. Implementation Phase
Objective: Develop the system according to the design.
Example:
Write code for modules like Add Book, Search Book, and Issue Book.

4. Testing Phase
Objective: Verify the system works as expected.
Example:
Unit Test: Validate the Add Book module.

5. Deployment Phase
Objective: Release the system for users.
Example:
Deploy the system to a web server or cloud (e.g., AWS).

6. Maintenance Phase
Objective: Ensure the system remains functional and updated.
Example:
Fix bugs reported by users (e.g., search not returning correct results).

![3 Tier Architecture](<diagrams/3 tier architechture.png>)

![Client server Architecture](<diagrams/client server architecture.png>)
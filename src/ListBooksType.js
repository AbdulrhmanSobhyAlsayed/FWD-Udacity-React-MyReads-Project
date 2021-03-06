import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const ListBooksType = ({ books, shelfStatus, handleChangeStatus }) => {
  let displayedBooks =
    shelfStatus === "all"
      ? [...books]
      : books.filter((book) => book.shelf === shelfStatus);
  return (
    <div>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {displayedBooks.map((book) => (
            <li key={book.id}>
              <Book
                bookId={book.id}
                bookName={book.title || "not mentioned"}
                bookAuthor={book.authors || "not mentioned"}
                bookUrl={book.imageLinks ? book.imageLinks.thumbnail : "#"}
                bookStatus={book.shelf}
                handleChangeStatus={handleChangeStatus}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

ListBooksType.propTypes = {
  books: PropTypes.array.isRequired,
  shelfStatus: PropTypes.string.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default ListBooksType;

import React from "react";
import PropTypes from "prop-types";

const Book = ({
  bookId,
  bookUrl,
  bookName,
  bookAuthor,
  bookStatus,
  handleChangeStatus,
}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url("${bookUrl}")`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={bookStatus}
            onChange={(event) => {
              handleChangeStatus(bookId, event.target.value);
            }}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookName}</div>
      <div className="book-authors">{bookAuthor}</div>
    </div>
  );
};

Book.prototype = {
  bookId: PropTypes.string.isRequired,
  bookUrl: PropTypes.string.isRequired,
  bookName: PropTypes.string.isRequired,
  bookAuthor: PropTypes.string.isRequired,
  bookStatus: PropTypes.string.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default Book;

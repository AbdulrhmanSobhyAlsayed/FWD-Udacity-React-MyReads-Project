import React, { Component } from "react";
import ListBooksType from "./ListBooksType";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class MyReads extends Component {
  state = {
    books: [],
  };
  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }
  updateShelfStatus = async (id, value) => {
    const books = await BooksAPI.update(id, value);
    if (books[value].includes(id)) {
      let updatedBooks = [...this.state.books];
      let index = updatedBooks.findIndex((book) => book.id === id);
      updatedBooks[index].shelf = value;
      this.setState({ books: updatedBooks });
    }
  };
  render() {
    const { books } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <ListBooksType
                books={books}
                shelfStatus="currentlyReading"
                handleChangeStatus={this.updateShelfStatus}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <ListBooksType
                books={books}
                shelfStatus="wantToRead"
                handleChangeStatus={this.updateShelfStatus}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <ListBooksType
                books={books}
                shelfStatus="read"
                handleChangeStatus={this.updateShelfStatus}
              />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="link">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default MyReads;

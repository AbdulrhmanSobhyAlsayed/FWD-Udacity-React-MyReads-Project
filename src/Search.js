import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import ListBooksType from "./ListBooksType";
import _ from "lodash";

class Search extends Component {
  state = {
    books: [],
    originalBooks: [],
  };
  async componentDidMount() {
    const originalBooks = await BooksAPI.getAll();
    this.setState({ originalBooks });
  }
  handleChangeSearch = _.debounce(async (value) => {
    if (value) {
      const books = await BooksAPI.search(value);

      if (!books.error) {
        let displayBooks = [...books];
        displayBooks.forEach((book) => {
          let originalIndex = this.state.originalBooks.findIndex(
            (element) => element.id === book.id
          );
          if (originalIndex > 0) {
            book.shelf = this.state.originalBooks[originalIndex].shelf;
          } else {
            book.shelf = "none";
          }
        });
        return this.setState({ books: displayBooks });
      }
    }
    return this.setState({ books: [] });
  }, 500);
  updateShelfStatus = async (id, value) => {
    const books = await BooksAPI.update(id, value);
    if (books) {
      let updatedBooks = [...this.state.books];
      let index = updatedBooks.findIndex((book) => book.id === id);
      updatedBooks[index].shelf = value;
      this.setState({ books: updatedBooks });

      const originalBooks = await BooksAPI.getAll();
      this.setState({ originalBooks });
    }
  };
  render() {
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => {
                this.handleChangeSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooksType
            books={books}
            shelfStatus="all"
            handleChangeStatus={this.updateShelfStatus}
          />
        </div>
      </div>
    );
  }
}

export default Search;

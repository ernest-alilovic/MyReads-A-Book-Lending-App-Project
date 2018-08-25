import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import DebounceInput from 'react-debounce-input';

class SearchBooks extends Component {

  state = {
    query: '',
    searchResults: []
  }

  handleInputChange = (event) => {
    let query = event.target.value
    this.setState({ query })
    this.searchBooks(query);
  }

  searchBooks = (term) => {
      BooksAPI.search(term).then(searchResults => {
        searchResults = searchResults || [];
        this.setState({searchResults})
      })
    }

    isBookOnShelf(currentBook) {
      let bookOnShelf = this.props.books.find(function(book) {
        return book.id === currentBook.id
    })

    return bookOnShelf
  }

  displayBooks = () => {
    if (!this.state.searchResults.error && this.state.searchResults.length > 0) {
      return this.state.searchResults.map(book =>
        <Book
          key={book.id} book={this.isBookOnShelf(book) || book} moveShelf={this.props.moveShelf}
        />
      );
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/' alt='Close'>Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.displayBooks()}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;

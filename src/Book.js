import React, { Component } from 'react';

class Book extends Component {
  render() {
    const {book} = this.props;
    const {shelf, title, authors} = book;
    const bookCover = {
      width: 128,
      height: 193,
      backgroundImage: `url("${this.props.book.imageLinks
                  ? this.props.book.imageLinks.thumbnail
                  : "http://dummyimage.com/128x193/292929/e3e3e3&text=No Cover Available"}")`
    };
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={bookCover}></div>
            <div className="book-shelf-changer">
              <select value={shelf || 'none'} onChange={(event) => this.props.moveShelf(this.props.book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors ? authors.join(', '): ''}</div>
        </div>
      </li>
    )
  }
}

export default Book;

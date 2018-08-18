import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class MainPage extends Component {
  render() {
    return (
        <div className="open-search">
          <Link to='/search' alt='Add a book'>Add a book</Link>
        </div>
    )
  }
}

export default MainPage;

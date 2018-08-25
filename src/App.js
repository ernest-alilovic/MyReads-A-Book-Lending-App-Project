import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import SearchBooks from './SearchBooks';
import ErrorPage from './ErrorPage';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getBooksOnShelf();
    });
  };

  getBooksOnShelf() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() =>
            <MainPage books={this.state.books} moveShelf={this.moveShelf} />
          } />
          <Route path='/search' render={() => (
            <SearchBooks books={this.state.books} moveShelf={this.moveShelf} />
          )}/>
          <Route render={() => (<ErrorPage/>)}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;

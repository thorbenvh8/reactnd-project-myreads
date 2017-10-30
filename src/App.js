import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import update from 'immutability-helper'

import BooksList from './BooksList'
import BooksSearch from './BooksSearch'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  onShelfChange = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then((res) => {
      var index = this.state.books.findIndex(book => book.id === bookId)
      var book = this.state.books[index]
      book.shelf = shelf
      this.setState(
        update(this.state.books,
          { $splice: [[index, 1, book]] }
        )
      )
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BooksSearch/>
        )}/>
        <Route exact path="/" render={() => (
          <BooksList books={this.state.books} onShelfChange={this.onShelfChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import update from 'immutability-helper'

import BooksList from './BooksList'
import BooksSearch from './BooksSearch'

const MAX_RESULTS = 100

class BooksApp extends React.Component {
  state = {
    books: [],
    foundBooks: [],
    query: ""
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

  onSearchShelfChange = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then((res) => {
      var booksIndex = this.state.books.findIndex(book => book.id === bookId)

      var foundBooksIndex = this.state.foundBooks.findIndex(book => book.id === bookId)
      var foundBook = this.state.foundBooks[foundBooksIndex]
      foundBook.shelf = shelf

      var books = null
      if (booksIndex !== -1) {
        // if book already in wall
        // update book
        books = update(this.state.books,
          { $splice: [[booksIndex, 1, foundBook]] }
        )
      } else {
        // if book not in wall
        // add book
        books = update(this.state.books,
          { $push: [foundBook] }
        )
      }

      this.setState({
        books,
        foundBooks:
          update(this.state.foundBooks,
            { $splice: [[foundBooksIndex, 1, foundBook]] }
          )
      })
    })
  }

  onSearch = (value) => {
    this.setState({
      query: value
    })
    if (value === "") {
      this.setState({
        foundBooks: [],
        noResults: false
      })
      return
    }
    BooksAPI.search(value, MAX_RESULTS).then(foundBooks => {
      foundBooks.map(foundBook => {
        var book = this.state.books.find(book => book.id === foundBook.id)
        if (book) {
          foundBook.shelf = book.shelf
        } else {
          foundBook.shelf = "none"
        }
        return foundBook
      })
      this.setState({
        foundBooks,
        noResults: false
      })
    }).catch(error => {
      this.setState({
        foundBooks: [],
        noResults: true
      })
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
          <BooksSearch query={this.state.query} noResults={this.state.noResults} books={this.state.foundBooks} onSearch={this.onSearch} onShelfChange={this.onSearchShelfChange}/>
        )}/>
        <Route exact path="/" render={() => (
          <BooksList books={this.state.books} onShelfChange={this.onShelfChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

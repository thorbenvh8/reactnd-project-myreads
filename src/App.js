import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'

import BooksList from './BooksList'
import BooksSearch from './BooksSearch'

class BooksApp extends React.Component {
  state = {
    books: []
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
          <BooksList books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

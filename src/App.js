import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import { Route } from 'react-router-dom'

import BooksList from './BooksList'
import BooksSearch from './BooksSearch'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BooksSearch/>
        )}/>
        <Route exact path="/" render={() => (
          <BooksList/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

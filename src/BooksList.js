import React from 'react'

import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

class BooksList extends React.Component {
  render() {
    const currentlyReadingBooks = this.props.books.filter(book => book.shelf === 'currentlyReading')
    const wantToReadBooks = this.props.books.filter(book => book.shelf === 'wantToRead')
    const readBooks = this.props.books.filter(book => book.shelf === 'read')
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently Reading" books={currentlyReadingBooks}/>
            <BookShelf title="Want to Read" books={wantToReadBooks}/>
            <BookShelf title="Read" books={readBooks}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksList

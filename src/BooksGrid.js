import React from 'react'

import Book from './Book'

class BooksGrid extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        { this.props.books &&
          this.props.books.map(book => (
            <li key={book.id}><Book title={book.title} authors={book.authors} imageUrl={book.imageLinks.thumbnail} shelf={book.shelf}/></li>
          ))
        }
      </ol>
    )
  }
}

export default BooksGrid

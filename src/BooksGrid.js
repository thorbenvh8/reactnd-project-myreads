import React from 'react'

import Book from './Book'

class BooksGrid extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        { this.props.books &&
          this.props.books.map(book => (
            <li key={book.id}><Book id={book.id} title={book.title} authors={book.authors} imageUrl={book.imageLinks.thumbnail} shelf={book.shelf} onShelfChange={this.props.onShelfChange}/></li>
          ))
        }
      </ol>
    )
  }
}

export default BooksGrid

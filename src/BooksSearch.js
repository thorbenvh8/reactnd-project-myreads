import React from 'react'

import { Link } from 'react-router-dom'

import BooksGrid from './BooksGrid'

const style = {
  noResults: {
    textAlign: "center"
  }
}

class BooksSearch extends React.Component {
  componentDidMount(){
     this.searchInput.focus();
     this.searchInput.select();
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" ref={(input) => { this.searchInput = input }} value={this.props.query} onChange={(event) => this.props.onSearch(event.target.value)} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          { this.props.noResults && <div style={style.noResults}>No results found</div> }
          { !this.props.noResults && <BooksGrid books={this.props.books} onShelfChange={this.props.onShelfChange}/> }
        </div>
      </div>
    )
  }
}

export default BooksSearch

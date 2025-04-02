import React from 'react'
import { useLocation } from 'react-router-dom'

const Search = () => {
    const location=useLocation()
    const searchResults=location.state.results
  return (
    <>
      {searchResults.length > 0 ? (
        <div className="row">
          {searchResults.map((product) => (
            <div className="col-md-3" key={product._id}>
              <div className="card mb-4">
                <img
                  src={`http://localhost:3000/api/v1/products/photo/${product._id}`}
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No products found</h2>
      )}
    </>
  )
}

export default Search

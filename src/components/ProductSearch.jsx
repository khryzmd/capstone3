import React, { useState } from 'react';
import ProductCard from './ProductCard'

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/search-by-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div>
      <h2>Product Search</h2>
      <div className="form-group">
        <label htmlFor="productName" className="mb-2">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary my-3" onClick={handleSearch}>
        Search
      </button>
      <ul>
        {searchResults.length > 0 && (
        <>
          <h3>Search Results:</h3>
          {searchResults.map(product => 
            product.isActive ? (
              <ProductCard productProp={product} key={product._id} />
            ) : null
          )}
        </>
        )}
      </ul>


    </div>
  );
};

export default ProductSearch;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PL = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <h2>{product.productName}</h2>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Discount: {product.discount}%</p>
          <p>Availability: {product.availability}</p>
        </div>
      ))}
    </div>
  );
};

export default PL;

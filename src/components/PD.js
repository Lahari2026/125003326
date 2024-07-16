import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PD = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://20.244.56.144/test/products/${productId}`);
        if (isMounted) {
          setProduct(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error:', error);
          setError('Failed to fetch product details');
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false when the component unmounts
    };
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div>
      <h1>{product.productName}</h1>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default PD;

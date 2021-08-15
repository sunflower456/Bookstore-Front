import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback }  from 'react';
import { useInView } from "react-intersection-observer"

// material
import { Grid } from '@material-ui/core';
import PRODUCTS from '../../../_mocks_/products';
import ShopProductCard from './ProductCard';
// ----------------------------------------------------------------------



ProductList.propTypes = {
  products: PropTypes.array.isRequired
};
export default function ProductList({ products, ...other }) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)


  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      setItems(items.concat(PRODUCTS));
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, items]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    }
  }, [handleScroll]);


  return (
    <Grid container spacing={3} {...other}>
        {items.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} id={product.index} />
          </Grid>
        ))} 
      {/* {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} id={product.index} />
        </Grid>
      ))} */}
    </Grid>
  );
}

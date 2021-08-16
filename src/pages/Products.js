import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
// material
import { Container, Typography, Button , Stack} from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  ProductList
} from '../components/_dashboard/products';
import PRODUCTS from '../_mocks_/products';
import Searchbar from '../layouts/dashboard/Searchbar';
import { Link } from 'react-router-dom' 

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState(PRODUCTS);
  const [input, setInput] = useState();

  
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });


  const filterProducts = () => {

    if(input.input == null || input.input == ''){
      setProducts(PRODUCTS);
    } else {
      setProducts(PRODUCTS.filter(product => product.name.indexOf(input.input) > -1));
    }
    
    
  }

  const searchInput = (e) => {
    setInput({input : e.target.value});
  };
  return (
    <Page title="허브중고서점">
      <Container>
        <Typography variant="h1" sx={{ mb: 15 }} >
          허브 중고 서점
        </Typography>
        <Button size="large" variant="contained" style={{marginBottom:"30px"}}>중고책 등록</Button>
        <Searchbar handleFilter={filterProducts} handleChange={searchInput} />
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
        </Stack>
        <ProductList products={products} />
        
      </Container>
    </Page>
  );
}

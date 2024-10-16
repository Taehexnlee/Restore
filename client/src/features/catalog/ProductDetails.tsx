import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../app/model/product';
import agent from '../../app/api/agent';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';

export default function ProductDetails() {
  const {basket, setBasket} =useStoreContext();
  const {id} = useParams<{id:string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQauntity] = useState(0);
  const [submitting, setSubmitting] =useState(false);
  const item = basket?.items.find(i => i.productId===product?.id);

  useEffect(() => {
    if(item) setQauntity(item.quantity);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id && agent.Catalog.details(parseInt(id))
    .then(response => setProduct(response))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false))
  },[id, item]);

  function handelInputChange(event: ChangeEvent<HTMLInputElement>)
  {
    if(parseInt(event.currentTarget.value) >= 0)
    {
      setQauntity(parseInt(event.currentTarget.value));
    }
    
  }

  function handelUpdateCart()
  {
    if(!product) return;
    setSubmitting(true);
    if(!item || quantity >item.quantity)
    {
      const updateQuantity =item ? quantity -item.quantity : quantity;
      agent.Basket.addItem(product.id, updateQuantity)
          .then(basket => setBasket(basket))
          .catch(error => console.log(error))
          .finally(()=> setSubmitting(false))
    }else
    {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product.id, updatedQuantity)
          .then(()=> removeItem(product.id, quantity))
          .catch(error => console.log(error))
          .finally(() => setSubmitting(false));
    }
  }

  if (loading) return <LoadingComponent message='Loading product...'/>

  if(!product) return <NotFound/>
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt= {product.name} style={{width :'100%'}}/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx= {{mb:2}}/>
        <Typography variant='h4' color='secondary'>{(product.price/100).toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Quantity</TableCell>
              <TableCell>{product.quantity}</TableCell>
              </TableRow>
              
                
                
                
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handelInputChange}
              variant='outlined'
              type='number'
              label='Quantity in Cart'
              fullWidth
              value={quantity}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <LoadingButton
            disabled ={item?.quantity === quantity || !item && quantity === 0}
            loading = {submitting}
            onClick={handelUpdateCart}
            sx={{height:'55px'}}
            color='primary'
            size='large'
            variant='contained'
            fullWidth
          >
            {item ? 'Updating Quantity' : 'Add to cart'}
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

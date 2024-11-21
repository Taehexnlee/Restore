import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from '@mui/material'
import { Product } from '../../app/model/product';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/util/util';
import { useDispatch } from 'react-redux';
import { addBasketItemAsync } from '../basket/basketSlice';
import { useAppSelector } from '../../app/store/configureStore';

interface Props{
    product: Product;
}
export default function ProductCard({product}: Props) {
  const {status} =useAppSelector(state => state.basket);
  const dispatch = useDispatch();

  return (
    <Card>
        <CardHeader
            avatar={
                <Avatar sx={{bgcolor: 'secondary.main'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title ={product.name}
            titleTypographyProps={{
                sx:{fontWeight: 'bold', color: 'primary.main'}
            }}
        />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain' , bgcolor:'primary.light' }}
        image= {product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
              loading={status.includes('pendingAddItem' + product.id)} 
              onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
              size="small">Add to cart</LoadingButton>
        <Button component= {Link} to ={`/catalog/${product.id}`}size="small">View</Button>
      </CardActions>
    </Card>
  )
}

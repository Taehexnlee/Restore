import LoadingComponent from "../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalog/catalogSlice";
import ProductList from "./catalog/ProductList";
import { useEffect } from "react";


export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll)
  const {productsLoaded, status } = useAppSelector(state => state.Catalog)
  const dispatch = useAppDispatch();
  

  useEffect(()=> {
   if(!productsLoaded) dispatch(fetchProductsAsync())
  },[dispatch, productsLoaded])

  if (status.includes('pending') ) return <LoadingComponent message="Loading products..."/>
  
  return (
    <>
        <ProductList products={products}/>
        
    </>
    
  )
}

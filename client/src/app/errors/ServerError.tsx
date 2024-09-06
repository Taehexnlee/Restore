import { Container, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';

export default function  () {
    const {state} =useLocation();
  return (
    <Container component={Paper}>
        {state?.error?(
            <>
                <Typography gutterBottom varient="h3" color="secondary">
                    {state.error.title}
                </Typography>
                <Divider/>
                <Typography varient="body1">
                    {state.error.detail || 'internal server error'}
                </Typography>

            </>
        ):(
                <Typography variant='h5' gutterBottom>Server Error</Typography>
        )}
        
    </Container>
  )
}

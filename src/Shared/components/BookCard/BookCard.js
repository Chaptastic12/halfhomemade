import React from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import SmallRecipeCard from './SmallRecipeCard/SmallRecipeCard';
import useProgressiveImage from '../../hooks/lazyLoad-hook';

import './BookCard.css'

const BookCard = props =>{

    const book = props.data;

    const loadedBookImage = useProgressiveImage(process.env.REACT_APP_IMAGE_ENDPOINT + book.bookImage.replace(/\\/g, '/') );

    return (
        <div className='Container'>
            <Row className='BookCard cust-shadow-sm' key={uuid()}>
                    <Col md={6} sm={12} className='BookImage'>
                        <div className='Image' style={{backgroundImage: `URL('${loadedBookImage}')`}} />
                    </Col>
                    <Col md={6} sm={12} className='Contents'>
                        <div>
                            <h1>{book.bookTitle} <Button size='sm' disabled style={{marginBottom: '5px'}}>Purchase Book</Button></h1>
                            <p>Featuring the below recipes</p>
                        </div>
                        <Row>
                            { book.recipes.map( recipe => <Col sm={6} md={3} as={NavLink} to={`/recipes/view/${ recipe._id }`}><SmallRecipeCard data={recipe} /></Col> )}
                        </Row>
                    </Col>
                    {props.isAdmin && <div>
                            <Button style={{marginRight: '5px'}} variant='danger'>Delete Book</Button>
                            <Button variant='warning'>Edit Book</Button>
                        </div>}
            </Row>
        </div>
   )
}

export default BookCard;
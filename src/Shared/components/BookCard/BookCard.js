import React, { useState } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import SmallRecipeCard from './SmallRecipeCard/SmallRecipeCard';
import useProgressiveImage from '../../hooks/lazyLoad-hook';
import PopupModal from '../UI Elements/Modal/Modal';
import { useHttp } from '../../hooks/http-hook';

import './BookCard.css'

const BookCard = props =>{

    const book = props.data;

    const loadedBookImage = useProgressiveImage(process.env.REACT_APP_IMAGE_ENDPOINT + book.bookImage.replace(/\\/g, '/') );
    const [ showModal, setShowModal ] = useState(false);
    const { sendRequest } = useHttp();

    const deleteBook = (id) =>{
        const deleteFromServer = async() => {
            try{
                await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'books/deleteOneBook/'+ id, 'DELETE', 'include', {Authorization: `Bearer ${props.userToken}`}, null, true);
            } catch(err){
                //Errors handled in hook
            }
        }
        deleteFromServer();
        setShowModal(false);
        setTimeout(() => { props.setDeletedBook(prevState => !prevState) }, 500 );
    }

    return (
        <div key={uuid()} className='Container'>
            <Row className='BookCard cust-shadow-sm' key={uuid()}>
                    <Col md={6} sm={12} className='BookImage'>
                        <div className='Image' style={{backgroundImage: `URL('${loadedBookImage}')`}} />
                    </Col>
                    <Col md={6} sm={12} className='Contents'>
                        <div>
                            <h1>{book.bookTitle} <Button size='sm' disabled style={{marginBottom: '5px'}}>Purchase Book</Button> </h1>
                            <p>Featuring the below recipes</p>
                        </div>
                        <Row>
                            { book.recipes.map( recipe => <Col key={uuid()} sm={6} md={3} as={NavLink} to={`/recipes/view/${ recipe._id }`}><SmallRecipeCard data={recipe} /></Col> )}
                        </Row>
                    </Col>
                    {props.isAdmin && <div>
                        <Button style={{marginRight: '5px'}} variant='danger' onClick={() => setShowModal(true)}>Delete Book</Button>
                        <Button variant='warning'>Edit Book</Button>
                    </div>}
                    { props.isAdmin && 
                        <PopupModal 
                            key={uuid()}
                            show={showModal} 
                            body={`Are you sure you would like to delete this entry? This will move any existing recipes to the For Reveiew book.`} 
                            title='Confirm deletion' 
                            handleClose={() => setShowModal(false)}
                            directTo='Confirm delete' 
                            directToFunction={() => deleteBook(book._id)} 
                            directToRoute={'/books/search/all'} 
                        />
                    }
            </Row>
        </div>
   )
}

export default BookCard;
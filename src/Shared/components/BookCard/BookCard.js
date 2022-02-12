import React, { useState, useContext } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import SmallRecipeCard from './SmallRecipeCard/SmallRecipeCard';
import useProgressiveImage from '../../hooks/lazyLoad-hook';
import PopupModal from '../UI Elements/Modal/Modal';
import { useHttp } from '../../hooks/http-hook';

import { SearchContext } from '../../context/search-context';

import './BookCard.css'

const BookCard = props =>{

    const book = props.data;

    const loadedBookImage = useProgressiveImage(process.env.REACT_APP_IMAGE_ENDPOINT + book.bookImage.replace(/\\/g, '/') );
    const [ showModal, setShowModal ] = useState(false);
    const { sendRequest } = useHttp();
    const { setSearchItem, setSearchParam } = useContext(SearchContext)

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

    let formattedBookTitle = book.bookTitle.replace(/\s/g,'').toLowerCase();

    return (
        <div key={uuid()} className='Container'>
            <Row className='BookCard cust-shadow-sm' key={uuid()}>
                    <Col md={6} sm={12} className='BookImage'>
                        <div className='Image' style={{backgroundImage: `URL('${loadedBookImage}')`}} />
                    </Col>
                    <Col md={6} sm={12} className='Contents'>
                        <div>
                            <h1>{book.bookTitle} <Button size='sm' style={{marginBottom: '5px'}}  as={NavLink} to={`/shop/search/${formattedBookTitle}`} onClick={()=> { setSearchParam('text'); setSearchItem(formattedBookTitle)}} >Purchase Book</Button> </h1>
                            <p>Featuring the below recipes</p>
                        </div>
                        <Row>
                            { book.recipes.map( recipe => <Col key={uuid()} sm={3} md={3} as={NavLink} to={`/recipes/view/${ recipe._id }`} style={{textDecoration: 'none'}}><SmallRecipeCard data={recipe} /></Col> )}
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
import React from 'react';

import { NavLink } from 'react-router-dom';

import { Col, Row, Button } from 'react-bootstrap';

import useProgressiveImage from '../../hooks/lazyLoad-hook';

import BookCover from '../../Img/Food/webp/Cover.webp'
import DivBackground from '../../Img/Food/webp/christopher-jolly-1Ib8243cU8Q-unsplash.webp'

import './BookDiv.css';

const BookDiv = props =>{

    const loadedBookCover = useProgressiveImage(BookCover);
    const loadedDivBackground = useProgressiveImage(DivBackground)

    return (
        <div className='BookDiv' style={{backgroundImage: 'URL(' + loadedDivBackground || null + ')'}} >
            <Row>
                <Col xs={6}>            
                    <div className="Main" style={{backgroundImage: 'URL(' + loadedBookCover || null + ')'}}>
                        <div className='Details'>
                            <h1>Check out our new book!</h1>
                            <p className='Subtext'>Bringing the best recipes from around the world to one book, right in your kitchen.<span className='d-none d-md-block'>
                            With recipes from Japan to America, you're sure to find something to enjoy for even the pickiest of eaters.</span></p>
                            <span>
                                <Button variant='outline-dark' as={NavLink} to='/shop/'>Buy the book </Button>
                                <Button variant='outline-dark' as={NavLink} to ='/recipes/search/all'>View Recipes</Button>
                            </span>
                            {/* <p className='LearnMore'>Learn more <i className="far fa-arrow-alt-circle-right" /></p> */}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default BookDiv;
import React from 'react';

import { NavLink } from 'react-router-dom';

import { Col, Row, Button } from 'react-bootstrap';

import useProgressiveImage from '../../hooks/lazyLoad-hook';

import BookCover from '../../Img/Food/webp/Cover.webp'
import DivBackground from '../../Img/Food/webp/christopher-jolly-1Ib8243cU8Q-unsplash.webp'

import './BookDiv.css';

const BookDiv = props =>{

    const test = true;

    const loadedBookCover = useProgressiveImage(BookCover);
    const loadedDivBackground = useProgressiveImage(DivBackground)

    return (
        <div className='d-flex justify-content-center align-items-center BookDiv3' style={{backgroundImage: 'URL(' + loadedDivBackground || null + ')'}} >
            <Row>
                <Col xs={6}>            
                    <div className="header2 d-flex justify-content-center align-items-end" style={{backgroundImage: 'URL(' + loadedBookCover || null + ')'}}>
                        <div className='BookDiv-BookText3  text-center'>
                            <h1>Check out our new book!</h1>
                            <p>Bringing the best recipes from around the world to one book, right in your kitchen.<span className='d-none d-md-block'>
                            With recipes from Japan to America, you're sure to find something to enjoy for even the pickiest of eaters.</span></p>
                            <span className='BookDiv-Buttons'>
                                <Button className='BookDiv-Button' variant='outline-dark' as={NavLink} to='/shop/'>Buy the book </Button>
                                <Button className='BookDiv-Button' variant='outline-dark' as={NavLink} to ='/recipes/all'>View Recipes</Button>
                            </span>
                            <p className='BookDiv-LearnMore'>Learn more <i className="far fa-arrow-alt-circle-right" /></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )

    if(test){
        return (
            <div className='BookDiv2' style={{backgroundImage: 'URL(' + loadedDivBackground || null + ')'}}>
                <Row >
                    <Col>
                        <div className="header" style={{backgroundImage: 'URL(' + loadedBookCover || null + ')'}}/>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center ">
                        <div className='BookDiv-BookText2 text-center'>
                            <h1>Check out our new book!</h1>
                            <p>Bringing the best recipes from around the world to one book, right in your kitchen.<span className='d-none d-md-block'>
                            With recipes from Japan to America, you're sure to find something to enjoy for even the pickiest of eaters.</span></p>
                            <span className='BookDiv-Buttons'>
                                <Button className='BookDiv-Button' variant='outline-dark' as={NavLink} to='/shop/'>Buy the book </Button>
                                <Button className='BookDiv-Button' variant='outline-dark' as={NavLink} to ='/recipes/all'>View Recipes</Button>
                            </span>
                            <p className='BookDiv-LearnMore'>Learn more <i className="far fa-arrow-alt-circle-right" /></p>
                        </div>
                    </Col>
                </Row>
                {/* <div className='Section-Divider' /> */}
            </div>)
    } else {
        return(
            <>
                <Row className='BookDiv'>
                    <Col sm='5'><div className='BookDiv-BookImg'/></Col>
                    <Col sm='7' className='d-flex justify-content-center align-items-center'>
                        <div className='BookDiv-BookText text-center'>
                            <h1>Check out our new book</h1>
                            <p>Bringing the best recipes from around the world to one book, right in your kitchen.<span className='d-none d-md-block'>
                            With recipes from Japan to America, you're sure to find something to enjoy for even the pickiest of eaters.</span></p>
                            <span className='BookDiv-Buttons'>
                                <Button className='BookDiv-Button' variant='light'>
                                    <NavLink to='/shop'>Buy the book</NavLink>
                                </Button>
                                <Button className='BookDiv-Button' variant='light'>
                                    <NavLink to='/recipes/all'>View Recipes</NavLink>
                                </Button>
                            </span>
                            <p className='BookDiv-LearnMore'>Learn more <i className="far fa-arrow-alt-circle-right" /></p>
                        </div>
                    </Col>
                </Row>
                <div className='Section-Divider' />
            </>
        );    
    }
}

export default BookDiv;
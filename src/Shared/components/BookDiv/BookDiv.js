import React from 'react';

import { NavLink } from 'react-router-dom';

import { Col, Row, Button, Container } from 'react-bootstrap';

import './BookDiv.css';

const BookDiv = props =>{

    const test = true;

    if(test){
        return (
            <div className='BookDiv2'>
                <Container >
                    <Row >
                        <Col />
                        <Col>
                        <div className="header d-flex justify-content-center align-items-end ">
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
                        </div>

                        </Col>
                        <Col />
                    </Row>
                </Container>
                <div className='Section-Divider' />
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
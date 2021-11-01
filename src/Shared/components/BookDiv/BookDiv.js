import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './BookDiv.css';

const BookDiv = props =>{

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
                            <Button className='BookDiv-Button' variant='light'>Buy the book</Button>
                            <Button className='BookDiv-Button' variant='light'>View Recipes</Button>
                        </span>
                        <p className='BookDiv-LearnMore'>Learn more <i class="far fa-arrow-alt-circle-right" /></p>
                    </div>
                </Col>
            </Row>
            <div className='Section-Divider' />
        </>
    );
}

export default BookDiv;
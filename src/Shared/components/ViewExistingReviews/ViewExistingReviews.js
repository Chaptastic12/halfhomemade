import React, { useState } from 'react';

import { Col, Row, Button } from 'react-bootstrap';
import ReviewRecipe from '../ReviewRecipe/ReviewRecipe';

import Stars from '../UI Elements/Stars/Stars';

import './ViewExistingReviews.css'

const ViewExistingReviews = props => {

    const [ editReview, setEditReveiw ] = useState(false);
    let review = props.data;

    // let mostRecentAmount = (-Math.abs(props.amount))
    // let reviewsToShow = props.data.slice(mostRecentAmount).map(review => {
    props.data.updatedAt = props.data.updatedAt.toString().split('T')[0];
    return ( <div className='Review' key={review._id}>
        <Row>
            <Col xs={2}>
                <i className="fas fa-user-circle Review-Icon" />
            </Col>
            <Col xs={8}>
                { !editReview ? <>
                    <Row>
                        <Stars item={review.rating} />
                        { review.author.username } 
                    </Row>
                
                    <Row> 
                        { review.text } 
                    </Row>
                    <Row> {review.updatedAt} </Row>
                </> : <>
                    <ReviewRecipe type='edit' rating={review.rating} placeholder={review.text} submitReview={ (type, rating, text, ratingSet) => { props.edit(type, rating, text, ratingSet, review._id); setEditReveiw(false) } } />
                </>
                }
            </Col>
            <Col xs={2}>
                { ( ( props.userID === review.author.id ) || props.isAdmin )  && <Row>
                    <div className='Review-Buttons d-flex align-items-center justify-content-center'>
                        { !editReview && <>
                            <Button variant='warning' onClick={() => setEditReveiw(true)}>Edit</Button>
                            <Button variant='danger' onClick={() => props.delete('delete', null, null, null, review._id)}>Delete</Button>
                        </> }
                    </div>
                </Row>
                }
            </Col>
        </Row>
    </div>
);
    // })

}

export default ViewExistingReviews;
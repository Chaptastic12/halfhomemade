import React, { useState } from 'react';

import { Col, Row, Button } from 'react-bootstrap';
import ReviewRecipe from '../ReviewRecipe/ReviewRecipe';

import Stars from '../UI Elements/Stars/Stars';

import './ViewExistingReviews.css'

const ViewExistingReviews = props => {

    const [ editReview, setEditReveiw ] = useState(false);

    let review = props.data;

    //Determine if we are editing or not; If we are, allow them to edit the fields. If not, just show the data as it is
    let reviewHTML;
    if(!editReview){
        reviewHTML = <>
                        <Row> <Stars item={review.rating} /> { review.author.username } </Row>
                        <Row> { review.text } </Row>
                        <Row> {review.updatedAt} </Row>
                    </>
    } else{
        reviewHTML = <ReviewRecipe type='edit' rating={review.rating} placeholder={review.text} submitReview={ (type, rating, text, ratingSet) => { props.edit(type, rating, text, ratingSet, review._id); setEditReveiw(false) } } />
    }

    //Adjust the updatedAt time to look nicer
    props.data.updatedAt = props.data.updatedAt.toString().split('T')[0];

    return ( 
        <div className='Review' key={review._id}>
            <Row>
                <Col xs={2}>
                    <i className="Icon fas fa-user-circle" />
                </Col>
                <Col xs={8}>
                    { reviewHTML }
                </Col>
                <Col xs={2}>
                    { ( ( props.userID === review.author.id ) || props.isAdmin )  && <Row>
                        <div className='Buttons'>
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
}

export default ViewExistingReviews;
import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import Stars from '../UI Elements/Stars/Stars';

const ReviewRecipe = props => {

    const [ reviewText, setReviewText ] = useState('');
    const [ reviewRating, setReviewRating ] = useState(5);
    const [ adjustRating, setAdjustRating ] = useState(true);

    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Select Rating to leave [ Click star to confirm ] <Stars leaveReview rating={reviewRating} setRating={setReviewRating} changeRating={adjustRating} setChangeRating={setAdjustRating} /> </Form.Label>
                    <Form.Control type="text" as='textarea' placeholder="Type your review here" onChange={e => setReviewText(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={() => props.submitReview('submit', reviewRating, reviewText, adjustRating)}>Submit </Button>
            </Form>
        </div>
    )
}

export default ReviewRecipe;
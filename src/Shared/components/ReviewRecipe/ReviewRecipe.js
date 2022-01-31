import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import Stars from '../UI Elements/Stars/Stars';

const ReviewRecipe = props => {

    let loadedRating, loadedText;
    if(props.type === 'submit'){
        loadedRating = 5;
        loadedText = '';
    } else{
        loadedRating = props.rating;
        loadedText = props.placeholder;
    }
    
    const [ reviewText, setReviewText ] = useState(loadedText);
    const [ reviewRating, setReviewRating ] = useState(loadedRating);
    const [ adjustRating, setAdjustRating ] = useState(true);

    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Select Rating to leave [ Click star to confirm ] <Stars leaveReview rating={reviewRating} setRating={setReviewRating} changeRating={adjustRating} setChangeRating={setAdjustRating} /> </Form.Label>
                    <Form.Control type="text" as='textarea' placeholder={props.placeholder} value={reviewText}onChange={e => setReviewText(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={() => props.submitReview(props.type, reviewRating, reviewText, adjustRating)}>Submit </Button>
            </Form>
        </div>
    )
}

export default ReviewRecipe;
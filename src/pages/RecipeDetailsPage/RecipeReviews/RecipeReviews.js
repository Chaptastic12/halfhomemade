import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import AlertDisplay from '../../../Shared/components/UI Elements/Alert/Alert';
import ViewExistingReviews from '../../../Shared/components/ViewExistingReviews/ViewExistingReviews';
import ReviewForm from '../../../Shared/components/ReviewForm/ReviewForm';

import { useHttp } from '../../../Shared/hooks/http-hook';
import { decryptData } from '../../../Shared/utils/util';

const RecipeReviews = props =>{

    const [ error, setError ] = useState(false);
    const { sendRequest } = useHttp();

    const { id, setRefreshpage, canSubmitReview, setCanSubmitReview, setAllowEnterReview, allowEnterReview, loadedRecipe, userState } = props;

    const submitReviewToServer = (type, rating, text, ratingSet, reviewID) =>{
        let url;
        let formData = null;
        let method = 'POST';
        switch(type){
            case 'submit':
                //Check for any issues with the data; If there are any, throw a specific error message
                if(ratingSet){ setError('Rating not chosen; Please click to confirm'); return }
                if(text === ''){ setError('Please enter in some text'); return; }

                formData = new FormData();
                formData.append('rating', rating);
                formData.append('text', text);
                url = process.env.REACT_APP_API_ENDPOINT + 'recipes/reviewARecipe/' + id
                break;
            case 'delete':
                url = process.env.REACT_APP_API_ENDPOINT + 'recipes/deleteAReview/' + id + '/' + reviewID
                method = 'DELETE';
                break;
            case 'edit':
                //Check for any issues with the data; If there are any, throw a specific error message
                if(ratingSet){ setError('Rating not chosen; Please click to confirm'); return }
                if(text === ''){ setError('Please enter in some text'); return; }
                formData = new FormData();
                formData.append('rating', rating);
                formData.append('text', text);
                url = process.env.REACT_APP_API_ENDPOINT + 'recipes/editARecipe/' + id + '/' + reviewID
                break;
            default:
                break;
        }

        const submitToServer = async() => {
            try{
                const responseData = await sendRequest(url, method, 'include', { Authorization: `Bearer ${userState.token}`}, formData, true);
                if(responseData.error){
                    console.log(responseData.error)
                    setError('Error submitting updated review to server')
                }
                setRefreshpage(prevState => !prevState);
                if(type === 'submit' || type === 'edit'){ setAllowEnterReview(false) }
                if(type === 'delete'){ setAllowEnterReview(true); setCanSubmitReview(true) }
            }
            catch (err) { /* Errors handled in the hook */ }
        }
        submitToServer();
    }

    return (
        <div className='RecipePageDetails-Review'>
            <p className='RecipePageDetails-ReviewText'>
                {/* Showing latest {amountOfReviews} reviews of {loadedRecipe.reviews.length} <Button size='sm' variant='outline-dark' onClick={() => setAmountOfReviews(loadedRecipe.reviews.length)}>View all</Button>  */}
                Reviews
                { userState.token && 
                    <span>
                        <Button size='sm' variant='outline-dark' disabled={!canSubmitReview} onClick={() => setAllowEnterReview(prevState => !prevState)}>{canSubmitReview ? 'Write a Review' : 'Already Reviewed'}</Button>
                    </span>
                }
            </p> 
            { userState.token && allowEnterReview && <>
                { error && <AlertDisplay alertText={error} /> }
                <ReviewForm type='submit' placeholder='Type your review here' submitReview={(type, rating, text, ratingSet) => submitReviewToServer(type, rating, text, ratingSet)} />
            </> }
            <div id='reviews'>
                {loadedRecipe.reviews.map(review =>
                    <ViewExistingReviews 
                        key={uuid()}
                        data={review} 
                        userID={userState.id ? decryptData(userState.id, process.env.REACT_APP_CRYPSALT) : null} 
                        isAdmin={userState.isAdmin} 
                        edit={(type, rating, text, ratingSet, reviewID) => submitReviewToServer(type, rating, text, null, reviewID)} 
                        delete={(type, rating, text, ratingSet, reviewID) => submitReviewToServer(type, null, null, null, reviewID)}/>
                    )} 
            </div>
        </div>
    )
}

export default RecipeReviews;
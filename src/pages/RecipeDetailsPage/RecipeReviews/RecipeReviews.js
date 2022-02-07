import React, { useState, useEffect } from 'react';

import { Button, Container } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import AlertDisplay from '../../../Shared/components/UI Elements/Alert/AlertDisplay';
import ViewExistingReviews from '../../../Shared/components/ViewExistingReviews/ViewExistingReviews';
import ReviewForm from '../../../Shared/components/ReviewForm/ReviewForm';

import { useHttp } from '../../../Shared/hooks/http-hook';
import { decryptData } from '../../../Shared/utils/util';

const RecipeReviews = props =>{

    const [ allowEnterReview, setAllowEnterReview ] = useState(false);
    const [ error, setError ] = useState(false);
    const { sendRequest } = useHttp();

    const { isProduct, id, setRefreshpage, canSubmitReview, setCanSubmitReview, loadedRecipe, userState } = props;

    //If we have a user logged in, decrypt their ID to find if theyve submitted any reviews yet
    useEffect(() => {
        if(userState.id && loadedRecipe){
            let decryptID = decryptData(userState.id, process.env.REACT_APP_CRYPSALT);
            for(let i=0; i < loadedRecipe.reviews.length; i++){
                //If they have submitted one, they won't be able to add a new one
                if(loadedRecipe.reviews[i].author.id === decryptID){
                    setCanSubmitReview(false);
                }
            }
        }
    // eslint-disable-next-line
    }, [loadedRecipe, userState.id]);

    const submitReviewToServer = (type, rating, text, ratingSet, reviewID) =>{
        let url = process.env.REACT_APP_API_ENDPOINT;
        let ratingObj;
        let method = 'POST';
        switch(type){
            case 'submit':
                //Check for any issues with the data; If there are any, throw a specific error message
                if(ratingSet){ setError('Rating not chosen; Please click to confirm'); return }
                if(text === ''){ setError('Please enter in some text'); return; }
                ratingObj = { rating, text }
                if(isProduct){ url += 'shop/submitProductReview/' + id } else { url += 'recipes/reviewARecipe/' + id }
                break;
            case 'delete':
                if(isProduct){ url +='shop/deleteAProductReview/' + id + '/' + reviewID } else { url +='recipes/deleteAReview/' + id + '/' + reviewID }
                method = 'DELETE';
                break;
            case 'edit':
                //Check for any issues with the data; If there are any, throw a specific error message
                if(ratingSet){ setError('Rating not chosen; Please click to confirm'); return }
                if(text === ''){ setError('Please enter in some text'); return; }
                ratingObj = { rating, text };
                if(isProduct){ url += 'shop/editAProductReview/' + id + '/' + reviewID } else { url += 'recipes/editARecipe/' + id + '/' + reviewID }
                break;
            default:
                break;
        }

        const submitToServer = async() => {
            try{                
                const responseData = await sendRequest(url, method, 'include', 
                    { Authorization: `Bearer ${userState.token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}, JSON.stringify(ratingObj), true);
                    console.log(responseData)
                if(responseData.error){
                    setError('Error submitting updated review to server')
                }
                setRefreshpage(prevState => !prevState);
                if(type === 'submit' || type === 'edit'){ setAllowEnterReview(false) }
                if(type === 'delete'){ setCanSubmitReview(true) }
            }
            catch (err) { /* Errors handled in the hook */ }
        }
        submitToServer();
    }

    return (<Container>
        <div className='RecipePageDetails-Review'>
            <p className='RecipePageDetails-ReviewText'>
                {/* Showing latest {amountOfReviews} reviews of {loadedRecipe.reviews.length} <Button size='sm' variant='outline-dark' onClick={() => setAmountOfReviews(loadedRecipe.reviews.length)}>View all</Button>  */}
                Reviews 
                { userState.token && 
                    <span style={{marginLeft: '5px'}}>
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
                {loadedRecipe.reviews.length === 0 && <div>No reviews</div>} 
            </div>
        </div>
    </Container>)
}

export default RecipeReviews;
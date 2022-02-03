import React, { useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import RecipeIngredientList from '../../Shared/components/RecipeIngredientList/RecipeIngredientList';
import RecipeSteps from '../../Shared/components/RecipeSteps/RecipeSteps';
import ReviewForm from '../../Shared/components/ReviewForm/ReviewForm';
import ViewExistingReviews from '../../Shared/components/ViewExistingReviews/ViewExistingReviews';
import Stars from '../../Shared/components/UI Elements/Stars/Stars';

import { useHttp } from '../../Shared/hooks/http-hook';
import { decryptData } from '../../Shared/utils/util';

import AlertDisplay from '../../Shared/components/UI Elements/Alert/Alert';
import { AuthContext } from '../../Shared/context/auth-context';

import './RecipeDetailsPage.css'

const RecipeDetailsPage = props =>{

    const { id } = useParams();
    const { userState } = useContext(AuthContext)
 
    useEffect(() =>{
        window.scrollTo(0,0);
    });

      const { sendRequest } = useHttp();
      const [ loadedRecipe, setLoadedRecipe ] = useState(null);
      const [ error, setError ] = useState(false);
      const [ canSubmitReview, setCanSubmitReview ] = useState(true);
      const [ allowEnterReview, setAllowEnterReview ] = useState(false)
      //const [ amountOfReviews, setAmountOfReviews ] = useState(3);
  
      //Make a call to our API to get our recipes
      useEffect(() => {
           //Reach out to our server
           const callToServer = async() => {
              try{
                  const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/getOneRecipe/' + id);
                  responseData.recipeImage = responseData.recipeImage.replace(/\\/g, '/');
                  setLoadedRecipe(responseData);
              } catch(err){ /*Errors handled in hook */ }
          }
          callToServer();
      },[id, sendRequest, setLoadedRecipe ]);

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
      }, [loadedRecipe, userState.id]);

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
                if(responseData.err){
                    setError('Error submitting updated review to server')
                }
                if(type === 'submit' || type === 'edit'){ setAllowEnterReview(false) }
                if(type === 'delete'){ setAllowEnterReview(true); setCanSubmitReview(true) }
            }
            catch (err) { /* Errors handled in the hook */ }
        }
        submitToServer();
    }

    let foodRating = loadedRecipe ? 
                        loadedRecipe.recipeRating === 0 ? 
                            'Not yet reviewed' 
                        : <Stars item={loadedRecipe.recipeRating} /> 
                    : 'Loading...'

    return(
        <div className='d-flex justify-content-center'>
            <div className='RecipePageDetails'>
                { loadedRecipe !== null && <div>
                    {/* This row shows the actual recipe */}
                    <Row>
                        <Col xs={12} lg={5}>
                            <div className='RecipePageDetails-RecipeImage' style={{backgroundImage: 'URL(' + process.env.REACT_APP_IMAGE_ENDPOINT + loadedRecipe.recipeImage + ')'}} /> 
                            <br /> 
                        </Col>
                        <Col>
                            <div className='RecipePageDetails-RecipeInfo'>
                                <h1 className='RecipePageDetails-Title text-center'>{loadedRecipe.recipeTitle}</h1>

                                <div className='RecipePageDetails-Rating'>{ foodRating } <a href='#reviews'>{ canSubmitReview ? 'Write a review' : 'View Reviews' }</a> </div>
                                <br />

                                <div> 
                                    <div className='IngredientList RecipePageDetails-Header text-center'>
                                        <h1><hr className='hr' style={{float: 'left' }}/>Description<hr className='hr' style={{float: 'right' }}/></h1>
                                    </div>
                                    <div className='text-center'>{ loadedRecipe.recipeDesc } </div>
                                </div>
                                <br/>

                                <div><RecipeIngredientList show ingredients={loadedRecipe.recipeIngredients} /></div>
                                <div><RecipeSteps details={loadedRecipe.recipeSteps} /></div>
                                
                                <div className='text-center'>
                                    <div> This recipe is featured in: {loadedRecipe.recipeBook.bookTitle}</div>
                                </div>

                            </div>
                        </Col>
                    </Row>
                    {/* This row shows the reviews post for the above recipe 
                        needs: userState, cabSubmitReview, setallowenterreview, allowenterreview, error, submitreviewtoserver, loadedrecipe, decryptdata
                    */}
                    <Row>
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
                    </Row> 
                </div>}
            </div>
        </div>
    )
}

export default RecipeDetailsPage;
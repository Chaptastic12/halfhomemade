import React, { useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';

import IngredientList from '../../Shared/components/IngredientList/IngredientList';
import RecipeDetails from '../../Shared/components/RecipeDetails/RecipeDetails';
import ReviewRecipe from '../../Shared/components/ReviewRecipe/ReviewRecipe';
import ViewExistingReviews from '../../Shared/components/ViewExistingReviews/ViewExistingReviews';
import Stars from '../../Shared/components/UI Elements/Stars/Stars';

import { useHttp } from '../../Shared/hooks/http-hook';
import { decryptData } from '../../Shared/utils/util';

import { AuthContext } from '../../Shared/context/auth-context';

import './RecipeDetailsPage.css'

const RecipeDetailsPage = props =>{

    const { id } = useParams();
    const { userState } = useContext(AuthContext)
 
    useEffect(() => {
        //Since the user could have scrolled down a bit on the Recipes page,
        //The below will scroll them back to the top once the details page loads
        document.body.scrollTop = 0;
      }, [])

      const { sendRequest } = useHttp();
      const [ loadedRecipe, setLoadedRecipe ] = useState(null);
      const [ error, setError ] = useState(false);
      const [ refresh, setRefresh ] = useState(false);
      const [ canSubmitReview, setCanSubmitReview ] = useState(true);
      const [ allowEnterReview, setAllowEnterReview ] = useState(false)
      const [ amountOfReviews, setAmountOfReviews ] = useState(3);
  
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
      },[id, sendRequest, setLoadedRecipe, refresh ]);

      //If we have a user logged in, decrypt their ID to find if theyve submitted any reviews yet
      useEffect(() => {
            if(userState.id && loadedRecipe){
                let decryptID = decryptData(userState.id, process.env.REACT_APP_CRYPSALT);
                for(let i=0; i < loadedRecipe.reviews.length; i++){
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
                url = process.env.REACT_APP_API_ENDPOINT + 'recipes/editARecipe/' + reviewID
                break;
            default:
                break;
        }

        const submitToServer = async() => {
            try{
                const responseData = await sendRequest(url, method, 'include', { Authorization: `Bearer ${userState.token}`}, formData, true);
                if(responseData){ setRefresh(prevState => !prevState) }
                if(type === 'submit'){ setAllowEnterReview(false) }
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
        <div className='RecipePageDetails'>
            { loadedRecipe !== null && <div>
                <Row>
                    <Col xs={12} lg={5}>
                        <div className='RecipePageDetails-RecipeImage' style={{backgroundImage: 'URL(' + process.env.REACT_APP_IMAGE_ENDPOINT + loadedRecipe.recipeImage + ')'}} /> 
                        <br /> 
                    </Col>
                     <Col>
                         <div className='RecipePageDetails-RecipeInfo'>
                            <h1 className='RecipePageDetails-Title text-center'>{loadedRecipe.recipeTitle}</h1>
                            <br />
                            <div className='RecipePageDetails-Rating'>{ foodRating } <a href='#reviews'>Write a review</a></div>
                            <div> 
                                <div className='IngredientList text-center'>
                                    <h1><hr className='hr' style={{float: 'left' }}/>Description<hr className='hr' style={{float: 'right' }}/></h1>
                                </div>
                                <div className='text-center'>{ loadedRecipe.recipeDesc } </div>
                            </div>
                            <br/>
                            <div><IngredientList show ingredients={loadedRecipe.recipeIngredients} /></div>
                            <div><RecipeDetails details={loadedRecipe.recipeSteps} /></div>
                            
                            <div className='text-center'>
                                <div> This recipe is featured in: {loadedRecipe.recipeBook.bookTitle}</div>
                                <br />
                                <div> <label>Tags:</label> <br />{loadedRecipe.recipeTags}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className='RecipePageDetails-Review'>
                        <p className='RecipePageDetails-ReviewText'>
                            Showing latest {amountOfReviews} reviews of {loadedRecipe.reviews.length} <Button size='sm' variant='outline-dark' onClick={() => setAmountOfReviews(loadedRecipe.reviews.length)}>View all</Button> 
                            { userState.token && 
                                <span>
                                    <Button size='sm' variant='outline-dark' disabled={!canSubmitReview} onClick={() => setAllowEnterReview(prevState => !prevState)}>{canSubmitReview ? 'Write a Review' : 'Already Reviewed'}</Button>
                                </span>
                            }
                        </p> 
                        { userState.token && allowEnterReview && <>
                            { error }
                            <ReviewRecipe submitReview={(type, rating, text, ratingSet) => submitReviewToServer(type, rating, text, ratingSet)} />
                        </> }
                        <div id='reviews'>
                            <ViewExistingReviews 
                                data={loadedRecipe.reviews} 
                                amount={amountOfReviews} 
                                userID={userState.id ? decryptData(userState.id, process.env.REACT_APP_CRYPSALT) : null} 
                                isAdmin={userState.isAdmin} 
                                edit={null} 
                                delete={(type, rating, text, ratingSet, reviewID) => submitReviewToServer(type, null, null, null, reviewID)}/> 
                        </div>
                    </div>
                </Row> 
            </div>}
        </div>
    )
}

export default RecipeDetailsPage;
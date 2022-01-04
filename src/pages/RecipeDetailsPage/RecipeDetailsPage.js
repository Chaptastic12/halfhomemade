import React, { useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';
import { Col, Row, Container, Button } from 'react-bootstrap';

import IngredientList from '../../Shared/components/IngredientList/IngredientList';
import RecipeDetails from '../../Shared/components/RecipeDetails/RecipeDetails';
import ReviewRecipe from '../../Shared/components/ReviewRecipe/ReviewRecipe';
import ViewExistingReviews from '../../Shared/components/ViewExistingReviews/ViewExistingReviews';

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
            }
            catch (err) { /* Errors handled in the hook */ }
        }
        // submitToServer();const submitToServer = async() => {
        //     try{
        //         const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/reviewARecipe/' + id, 'POST', 'include', { Authorization: `Bearer ${userState.token}`}, formData, true);
        //         if(responseData){ setRefresh(prevState => !prevState) }
        //     }
        //     catch (err) { /* Errors handled in the hook */ }
        // }
        submitToServer();
    }

    return(
        <div className='RecipePageDetails'>
            { loadedRecipe !== null && <Container className='RecipePageDetails-Container'>
                <Row>
                    <Col xs={{span: 12, order: 'last'}} lg={{span: 3, order: 'first'}}>
                        <div className='RecipePageDetails-IngredientsList text-center'>
                            <IngredientList ingredients={loadedRecipe.recipeIngredients} />
                        </div>
                    </Col>
                    <Col xs={{span: 12, order: 'first'}} lg={{span: 9, order: 'last'}}>
                        <div className='RecipePageDetails-Instructions'>
                            <h1 className='RecipePageDetails-Title text-center'>{loadedRecipe.recipeTitle}</h1>
                            <RecipeDetails details={loadedRecipe.recipeSteps} image={loadedRecipe.recipeImage}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <p className='RecipePageDetails-ReviewText'>
                        Showing latest {amountOfReviews} reviews of {loadedRecipe.reviews.length} <Button size='sm' variant='outline-light' onClick={() => setAmountOfReviews(loadedRecipe.reviews.length)}>View all</Button> 
                        { userState.token && 
                            <span>
                                <Button size='sm' variant='outline-light' disabled={!canSubmitReview} onClick={() => setAllowEnterReview(prevState => !prevState)}>{canSubmitReview ? 'Write a Review' : 'Already Reviewed'}</Button>
                            </span>
                        }
                    </p> 
                    { userState.token && allowEnterReview && <>
                        { error }
                        <ReviewRecipe submitReview={(type, rating, text, ratingSet) => submitReviewToServer(type, rating, text, ratingSet)} />
                    </> }
                    <ViewExistingReviews 
                        data={loadedRecipe.reviews} 
                        amount={amountOfReviews} 
                        userID={userState.id ? decryptData(userState.id, process.env.REACT_APP_CRYPSALT) : null} 
                        isAdmin={userState.isAdmin} 
                        edit={null} 
                        delete={(type, rating, text, ratingSet, reviewID) => submitReviewToServer(type, null, null, null, reviewID)}/> 
                </Row> 
            </Container> }
        </div>
    )
}

export default RecipeDetailsPage;
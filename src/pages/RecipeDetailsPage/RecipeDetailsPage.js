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
                  setLoadedRecipe(responseData);
                  if(userState.id){
                        let decryptID = decryptData(userState.id, process.env.REACT_APP_CRYPSALT);
                        let allow = true;
                        for(let i=0; i < loadedRecipe.reviews.length; i++){
                            if(loadedRecipe.reviews[i].author.id === decryptID){
                                allow = false;
                            }
                        }
                        setCanSubmitReview(allow);
                    }
              } catch(err){
                  //Errors handled in hook
              }
          }
          callToServer();
      // eslint-disable-next-line
      },[id, sendRequest, setLoadedRecipe, refresh ])

    if(loadedRecipe){
        loadedRecipe.recipeImage = loadedRecipe.recipeImage.replace(/\\/g, '/');
    }

    const submitReviewToServer = (rating, text, ratingSet) =>{
        if(ratingSet){ setError('Rating not chosen; Please click to confirm'); return }
        if(text === ''){ setError('Please enter in some text'); return; }

        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('text', text);

        const submitToServer = async() => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/reviewARecipe/' + id, 'POST', 'include', { Authorization: `Bearer ${userState.token}`}, formData, true);
                console.log(responseData);

                if(responseData){
                    //Add logic for redirecting upon receipt of our success from server
                    setRefresh(prevState => !prevState)             
                }
            }
            catch (err) { console.log(err) }
        }
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
                            <Button size='sm' variant='outline-light' disabled={!canSubmitReview} onClick={() => setAllowEnterReview(prevState => !prevState)}>{canSubmitReview ? 'Write a Review' : 'Already Reviewed'}</Button>
                        }
                    </p> 
                    { userState.token && allowEnterReview && <>
                        { error }
                        <ReviewRecipe submitReview={(rating, text, ratingSet) => submitReviewToServer(rating, text, ratingSet)} />
                    </> }
                    <ViewExistingReviews data={loadedRecipe.reviews} amount={amountOfReviews} /> 
                </Row> 
            </Container> }
        </div>
    )
}

export default RecipeDetailsPage;
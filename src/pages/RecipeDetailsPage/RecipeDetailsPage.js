import React, { useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import RecipeIngredientList from '../../Shared/components/RecipeIngredientList/RecipeIngredientList';
import RecipeSteps from '../../Shared/components/RecipeSteps/RecipeSteps';
import Stars from '../../Shared/components/UI Elements/Stars/Stars';
import RecipeReviews from './RecipeReviews/RecipeReviews';

import { useHttp } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';

import './RecipeDetailsPage.css'

const RecipeDetailsPage = props =>{

    const { id } = useParams();
    const { userState } = useContext(AuthContext)
 
    useEffect(() =>{
        window.scrollTo(0,0);
    },[]);

      const { sendRequest } = useHttp();
      const [ loadedRecipe, setLoadedRecipe ] = useState(null);
      const [ canSubmitReview, setCanSubmitReview ] = useState(true);
      const [ refreshPage, setRefreshpage ] = useState(false);
  
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
      },[id, sendRequest, setLoadedRecipe, refreshPage]);

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
                    {/* This row shows the reviews post for the above recipe */}
                    <Row>
                        <RecipeReviews isProduct={false} id={id} canSubmitReview={canSubmitReview} setCanSubmitReview={setCanSubmitReview} 
                            loadedRecipe={loadedRecipe} userState={userState} setRefreshpage={setRefreshpage} 
                        />
                    </Row> 
                </div>}
            </div>
        </div>
    )
}

export default RecipeDetailsPage;
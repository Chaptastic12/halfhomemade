import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

import IngredientList from '../../Shared/components/IngredientList/IngredientList';
import RecipeDetails from '../../Shared/components/RecipeDetails/RecipeDetails';

import foodImg from '../../Shared/Img/Food/Mafu_tofu.jpg'
import userImg from '../../Shared/Img/Food/Cover.jpg'

import { useHttp } from '../../Shared/hooks/http-hook';

import './RecipeDetailsPage.css'

const RecipeDetailsPage = props =>{

    const { id } = useParams();

    useEffect(() => {
        //Since the user could have scrolled down a bit on the Recipes page,
        //The below will scroll them back to the top once the details page loads
        document.body.scrollTop = 0;
      }, [])

      const { sendRequest } = useHttp();
      const [ loadedRecipe, setLoadedRecipe ] = useState(null);
  
      //Make a call to our API to get our recipes
      useEffect(() => {
           //Reach out to our server
           const callToServer = async() => {
              try{
                  console.log('call')
                  const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/getOneRecipe/' + id);
                  setLoadedRecipe(responseData);
              } catch(err){
                  //Errors handled in hook
              }
          }
          callToServer();
      },[id, sendRequest, setLoadedRecipe])

    if(loadedRecipe){
        loadedRecipe.recipeImage = loadedRecipe.recipeImage.replace(/\\/g, '/');
    }

    return(
        <div className='RecipePageDetails'>
            { loadedRecipe !== null && <Container className='RecipePageDetails-Container'>
                <Row>
                    <Col xs={{span: 12, order: 'last'}} md={{span: 3, order: 'first'}}>
                        <div className='RecipePageDetails-IngredientsList text-center'>
                            <IngredientList ingredients={loadedRecipe.recipeIngredients} />
                        </div>
                    </Col>
                    <Col xs={{span: 12, order: 'first'}} md={{span: 9, order: 'last'}}>
                        <div className='RecipePageDetails-Instructions'>
                            <h1 className='RecipePageDetails-Title text-center'>{loadedRecipe.recipeTitle}</h1>
                            <RecipeDetails details={loadedRecipe.recipeSteps} image={loadedRecipe.recipeImage}/>
                        </div>
                    </Col>
                </Row>
            </Container> }
        </div>
    )
}

export default RecipeDetailsPage;
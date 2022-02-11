import React, { useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';

import RecipeIngredientList from '../../Shared/components/RecipeIngredientList/RecipeIngredientList';
import RecipeSteps from '../../Shared/components/RecipeSteps/RecipeSteps';
import Stars from '../../Shared/components/UI Elements/Stars/Stars';
import RecipeReviews from './RecipeReviews/RecipeReviews';
import { decryptData } from '../../Shared/utils/util';

import { useHttp } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';

import useProgressiveImage from '../../Shared/hooks/lazyLoad-hook';
import defaultImage from '../../Shared/Img/Food/webp/loadingImage.webp'

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
    const [ userLikesRecipe, setUserLikesRecipe ] = useState(undefined);

    //Make a call to our API to get our recipes
    useEffect(() => {
        //Reach out to our server
        const callToServer = async() => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/getOneRecipe/' + id);
                responseData.recipeImage = responseData.recipeImage.replace(/\\/g, '/');

                //Check if we have a logged in user, and a valid response
                if(responseData && userState.id){
                    let findIfUserLikesRecipe = undefined;
                    //If we find a match, then we can update our state
                    findIfUserLikesRecipe = responseData.likes.find(like => like === decryptData(userState.id, process.env.REACT_APP_CRYPSALT));
                    setUserLikesRecipe(findIfUserLikesRecipe);
                }

                setLoadedRecipe(responseData);
            } catch(err){ /*Errors handled in hook */ }
        }
        callToServer();
    // eslint-disable-next-line 
    },[id, setLoadedRecipe, refreshPage]);

    const submitLikeToServer = async(e) => {
        e.preventDefault()
        try{
            await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/addARecipeToUserLikes/' + id, 'POST', 'include', { Authorization: `Bearer ${userState.token}`}, null, true);
            setRefreshpage(prevState => !prevState);
        } catch(err){ /*Errors handled in hook*/ }
    }

    let foodRating = loadedRecipe ? 
                        loadedRecipe.recipeRating === 0 ? 
                            'Not yet reviewed' 
                        : <Stars item={loadedRecipe.recipeRating} /> 
                    : 'Loading...'

    let image = defaultImage;
    if(loadedRecipe){
        image = process.env.REACT_APP_IMAGE_ENDPOINT + loadedRecipe.recipeImage
    }

    let loadedRecipeImage = useProgressiveImage(image);

    return(
        <div className='d-flex justify-content-center align-items-center'>
            <div className='RecipePageDetails'>
                { loadedRecipe !== null && <div>
                    {/* This row shows the actual recipe */}
                    <Row>
                        <Col xs={12} lg={5}>
                            <div className='RecipePageDetails-RecipeImage' style={{backgroundImage: 'URL(' + loadedRecipeImage + ')'}} /> 
                            <br /> 
                            { userState.token && <div className='d-flex justify-content-center' style={{width: '100%'}}>
                                <Button size='lg' style={{width: '200px'}} onClick={(e) => submitLikeToServer(e)}>
                                    { userLikesRecipe === undefined ? <span>Like <i className="fas fa-thumbs-up" /></span> :
                                     <span>Dislike <i className="fas fa-thumbs-down" /></span> }
                                </Button>
                            </div> }
                        </Col>
                        <Col xs={12} lg={7}>
                            <div className='RecipePageDetails-RecipeInfo'>
                                <h1 className='RecipePageDetails-Title text-center'>{loadedRecipe.recipeTitle}</h1>

                                <div className='RecipePageDetails-Rating'>{ foodRating } <a href='#reviews'>{ ( canSubmitReview && userState.id ) ? 'Write a review' : 'View Reviews' }</a> </div>
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
import React, { useState, useEffect } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';

import { Container, Row } from 'react-bootstrap'

import { useHttp } from '../../Shared/hooks/http-hook';
import PageHeader from '../../Shared/components/PageHeader/PageHeader';

import FoodPlatter from '../../Shared/Img/Food/webp/Food_platter.webp';

import useProgressiveImage from '../../Shared/hooks/lazyLoad-hook';

import './RecipePage.css';

const RecipePage = props =>{

    const { sendRequest } = useHttp();
    const [ loadedRecipes, setLoadedRecipes ] = useState([]);
    const [ allRecipes, setAllRecipes ] = useState([]);
    const [ deletedRecipe, setDeletedRecipe ] = useState(false);

    //Make a call to our API to get our recipes
    useEffect(() => {
         //Reach out to our server
         const callToServer = async() => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/showAllRecipes');
                //Update state for the recipes we show; Keep a back up of all our recipes for searching.
                setLoadedRecipes(responseData);
                setAllRecipes(responseData);
            } catch(err){ /* Errors handled in hook */ }
        }
        callToServer();

        setDeletedRecipe(false);
    },[deletedRecipe, sendRequest, setLoadedRecipes]);

    const recipeSearchHandler = ( title, tag ) => {
        //If title is null, we are only searching by tag
        if(title === null){

        }
    }

    let recipeCardFormat;
    //Project the site if the server goes down
    if(loadedRecipes){
        const serverRecipes = loadedRecipes.map(recipe => {
            //Update the URl for our images and how the createdAt is formatted.
            recipe.recipeBook.bookImage = recipe.recipeBook.bookImage.replace(/\\/g, '/');
            recipe.recipeImage = recipe.recipeImage.replace(/\\/g, '/');
            recipe.createdAt = recipe.createdAt.toString().split('T')[0];
            return <RecipeCard
                data={recipe}
                key={recipe._id}
                delete={() => setDeletedRecipe(true)} 
                adminPage={props.admin}/>
        })
        recipeCardFormat = <Row>{serverRecipes}</Row>
    } else {
        recipeCardFormat = <Row>EROR: UNABLE TO REACH SITE...</Row>
    }

    const loadedFoodPlatter = useProgressiveImage(FoodPlatter)

    if(props.admin){
        return <div className='RecipePage'> { recipeCardFormat } </div>
    } else {
        return(
            <div className='RecipePage'>
                <Container>
                    <PageHeader backgroundImage={loadedFoodPlatter}/> 
                   { loadedRecipes && recipeCardFormat }
                </Container>
            </div>
        )
    }

    
}

export default RecipePage;
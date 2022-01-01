import React, { useState, useContext, useEffect } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';

import { Container, Row } from 'react-bootstrap'

import { MobileContext } from '../../Shared/context/mobile-context';
import { useHttp } from '../../Shared/hooks/http-hook';
import PageHeader from '../../Shared/components/PageHeader/PageHeader';

import FoodPlatter from '../../Shared/Img/Food/webp/Food_platter.webp';

import useProgressiveImage from '../../Shared/hooks/lazyLoad-hook';

import './RecipePage.css';

const RecipePage = props =>{

    const { sendRequest } = useHttp();
    const [ loadedRecipes, setLoadedRecipes ] = useState([]);
    const [ deletedRecipe, setDeletedRecipe ] = useState(false);

    //Make a call to our API to get our recipes
    useEffect(() => {
         //Reach out to our server
         const callToServer = async() => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/showAllRecipes');
                setLoadedRecipes(responseData);
            } catch(err){
                //Errors handled in hook
            }
        }
        callToServer();

        setDeletedRecipe(false);
    },[deletedRecipe, sendRequest, setLoadedRecipes])

    const { isMobile } = useContext(MobileContext);

    let recipeCardFormat;

    //Project the site if the server goes down
    if(loadedRecipes){
        const serverRecipes = loadedRecipes.map(recipe => {
            //Book information isnt set up yet
            recipe.bookRating = 5;
            
            recipe.recipeBook.bookImage = recipe.recipeBook.bookImage.replace(/\\/g, '/');
            recipe.recipeImage = recipe.recipeImage.replace(/\\/g, '/');
            recipe.createdAt = recipe.createdAt.toString().split('T')[0];
            return <RecipeCard
                key={recipe._id}
                id={recipe._id} 
                foodImage={recipe.recipeImage} foodTitle={recipe.recipeTitle} foodDesc={recipe.recipeDesc} foodRating={recipe.recipeRating} 
                userImage={recipe.recipeBook.bookImage} userRating={recipe.bookRating} 
                tags={recipe.recipeTags} 
                date={recipe.createdAt}
                delete={() => setDeletedRecipe(true)} 
                adminPage={props.admin}/>
        })

        if(!isMobile){
            recipeCardFormat = <>{serverRecipes}</>
        } else {
            recipeCardFormat = <Row>{serverRecipes}</Row>
        }
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
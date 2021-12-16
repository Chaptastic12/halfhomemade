import React, { useState, useContext, useEffect } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';
import userImg from '../../Shared/Img/Food/Cover.jpg'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { MobileContext } from '../../Shared/context/mobile-context';
import { useHttp } from '../../Shared/hooks/http-hook';
import PageHeader from '../../Shared/components/PageHeader/PageHeader';

import FoodPlatter from '../../Shared/Img/Food/Food_platter.jpg';

import './RecipePage.css';

const RecipePage = props =>{

    const { sendRequest } = useHttp();
    const [ loadedRecipes, setLoadedRecipes ] = useState([]);

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
    },[sendRequest, setLoadedRecipes])

    const { isMobile } = useContext(MobileContext);

    let recipeCardFormat;

    //Project the site if the server goes down
    if(loadedRecipes){
        const serverRecipes = loadedRecipes.map(recipe => {
            //Book information isnt set up yet
            recipe.bookImage = userImg;
            recipe.bookRating = 5;
    
            recipe.recipeImage = recipe.recipeImage.replace(/\\/g, '/');
            recipe.createdAt = recipe.createdAt.toString().split('T')[0];
            return <RecipeCard
                key={recipe._id}
                id={recipe._id} 
                foodImage={recipe.recipeImage} foodTitle={recipe.recipeTitle} foodDesc={recipe.recipeDesc} foodRating={recipe.recipeRating} 
                userImage={recipe.bookImage} userRating={recipe.bookRating} 
                tags={recipe.recipeTags} 
                date={recipe.createdAt} />
        })

        if(!isMobile){
            recipeCardFormat = <>{serverRecipes}</>
        } else {
            recipeCardFormat = <Row>{serverRecipes}</Row>
        }
    } else {
        recipeCardFormat = <Row>EROR: UNABLE TO REACH SITE...</Row>
    }


    return(
        <div className='RecipePage'>
            <Container>
                <PageHeader backgroundImage={FoodPlatter}/>
               { recipeCardFormat }
            </Container>
        </div>
    )
    
}

export default RecipePage;
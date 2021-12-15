import React, { useState, useContext, useEffect } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';
import foodImg from '../../Shared/Img/Food/Mafu_tofu.jpg'
import userImg from '../../Shared/Img/Food/Cover.jpg'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { MobileContext } from '../../Shared/context/mobile-context';
import { useHttp } from '../../Shared/hooks/http-hook';
import PageHeader from '../../Shared/components/PageHeader/PageHeader';

import FoodPlatter from '../../Shared/Img/Food/Food_platter.jpg';

import './RecipePage.css';

const testData = [{
    id: 12345,
    foodImage: foodImg,
    foodTitle: 'Mapo Tofu',
    foodDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    foodRating: 5,
    userImage: userImg,
    userRating: 5,
    tags: ['Chinese', 'Rice', ' Tofu'],
    date: '11/5/2021'
},
{
    id: 123456,
    foodImage: foodImg,
    foodTitle: 'Mapo Tofu',
    foodDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    foodRating: 5,
    userImage: userImg,
    userRating: 5,
    tags: ['Chinese', 'Rice', 'Tofu'],
    date: '11/6/2021'
}];

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

    const recipes = testData.map(recipe => {
        return <RecipeCard
            key={recipe.id + recipe.userRating} 
            id={recipe.id} 
            foodImage={recipe.foodImage} foodTitle={recipe.foodTitle} foodDesc={recipe.foodDesc} foodRating={recipe.foodRating} 
            userImage={recipe.userImage} userRating={recipe.userRating} 
            tags={recipe.tags} 
            date={recipe.date} />
    })

    const serverRecipes = loadedRecipes.map(recipe => {
        //Book information isnt set up yet
        recipe.bookImage = userImg;
        recipe.bookRating = 5;

        recipe.recipeImage = recipe.recipeImage.replace(/\\/g, '/');
        recipe.createdAt = recipe.createdAt.toString().split('T')[0];
        return <RecipeCard
            key={recipe._id } 
            foodImage={recipe.recipeImage} foodTitle={recipe.recipeTitle} foodDesc={recipe.recipeDesc} foodRating={recipe.recipeRating} 
            userImage={recipe.bookImage} userRating={recipe.bookRating} 
            tags={recipe.recipeTags} 
            date={recipe.createdAt} />
    })

    let recipeCardFormat;
    if(!isMobile){
        recipeCardFormat = <>{recipes} {serverRecipes}</>
    } else {
        recipeCardFormat = <Row>{recipes}  {serverRecipes}</Row>
    }

    return(
        <div className='RecipePage'>
            <Container>
                <PageHeader backgroundImage={FoodPlatter}/>
               {recipeCardFormat}
            </Container>
        </div>
    )
    
}

export default RecipePage;
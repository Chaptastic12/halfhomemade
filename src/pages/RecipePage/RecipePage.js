import React, { useContext } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';
import foodImg from '../../Shared/Img/Food/Mafu_tofu.jpg'
import userImg from '../../Shared/Img/Food/Cover.jpg'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { MobileContext } from '../../Shared/context/mobile-context';
import PageHeader from '../../Shared/components/PageHeader/PageHeader';

import './RecipePage.css';

const testData = [{
    id: 12345,
    foodImage: foodImg,
    foodTitle: 'Mafu Tofu',
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
    foodTitle: 'Mafu Tofu',
    foodDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    foodRating: 5,
    userImage: userImg,
    userRating: 5,
    tags: ['Chinese', 'Rice', 'Tofu'],
    date: '11/6/2021'
}];

const RecipePage = props =>{

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

    let recipeCardFormat;
    if(!isMobile){
        recipeCardFormat = <>{recipes}</>
    } else {
        recipeCardFormat = <Row>{recipes}</Row>
    }

    return(
        <div className='RecipePage'>
            <Container>
                <PageHeader />
               {recipeCardFormat}
            </Container>
        </div>
    )
    
}

export default RecipePage;
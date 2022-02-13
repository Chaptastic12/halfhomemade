import React, { useContext } from 'react';

import { Row, Col } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import ReviewCard from './ReviewCard';

import { ServerContext } from '../../../Shared/context/server-context';

import './RecipeReview.css';

const RecipeReviews = props =>{

    const { allRecipes } = useContext(ServerContext);

    //Make a copy because we will be removing recipes we already got a review from
    let allRecipedCopy = [ ...allRecipes ];

    //Only show recipes that are 4* or higher
    allRecipedCopy = allRecipedCopy.filter(recipe => recipe.recipeRating >= 4);

    let reviewsToShow = [];
    //Show a maximum of 5, or a minimum of the length of our found reviews
    const numberOfReviews = Math.min(allRecipedCopy.length, 5);
    if(allRecipes.length > 0){
        for(let i=0; i < numberOfReviews; i++){
            let randomRecipeIndex = Math.floor(Math.random() * allRecipedCopy.length);
            let randomReviewIndex = Math.floor(Math.random() *allRecipedCopy[randomRecipeIndex].reviews.length);
            reviewsToShow.push( { 
                review: allRecipedCopy[randomRecipeIndex].reviews[randomReviewIndex], 
                recipe: {
                    id: allRecipedCopy[randomRecipeIndex]._id,
                    title:allRecipedCopy[randomRecipeIndex].recipeTitle
                } 
            });
            allRecipedCopy.splice(randomRecipeIndex, 1);
        }
    }

    console.log(reviewsToShow)
    const reviewCards = reviewsToShow.map( review =>  <Col key={uuid()}> <ReviewCard data={review} /> </Col> )
 
    return (
        <div className='RecipeReview'>
            <h1>Checkout some recipe reviews</h1>
            <Row>
                { reviewCards }
            </Row>
        </div>
    )
}

export default RecipeReviews;
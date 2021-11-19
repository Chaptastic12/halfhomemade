import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import foodImg from '../../Shared/Img/Food/Mafu_tofu.jpg'
import userImg from '../../Shared/Img/Food/Cover.jpg'

const RecipeDetailsPage = props =>{

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

    const { id } = useParams();

    //Grab our data from the database
    //For now it is all in an array, so we need to iterate over that array
    //Once we have a DB setup, we will be able to just make calls to it instead
    let recipeData;
    for(let i=0; i < testData.length; i++){
        console.log(testData[i].id);
        if(testData[i].id === parseInt(id, 0)){
            recipeData = testData[i];
            console.log(recipeData);
        }
        //If we don't find any data, send us back to the home page
        else{
            <Redirect to='/' exact/>
        }
    }

    return(
        <div>
            <h1>{id}</h1>
        </div>
    )
}

export default RecipeDetailsPage;
import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

import IngredientList from '../../Shared/components/IngredientList/IngredientList';
import RecipeDetails from '../../Shared/components/RecipeDetails/RecipeDetails';

import foodImg from '../../Shared/Img/Food/Mafu_tofu.jpg'
import userImg from '../../Shared/Img/Food/Cover.jpg'

import './RecipeDetailsPage.css'

const RecipeDetailsPage = props =>{

    const testData = [{
        id: 12345,
        foodImage: foodImg,
        foodTitle: 'Mapo Tofu',
        foodDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        foodRating: 5,
        userImage: userImg,
        userRating: 5,
        tags: ['Chinese', 'Rice', ' Tofu'],
        date: '11/5/2021',
        ingredients: [
            { quantity: 1, measurement: 'lb', ingredient: 'chicken thighs', special: null},
            { quantity: 2, measurement: 'tbsp', ingredient: 'cornstarch', special: null},
            { quantity: 2, measurement: 'tbsp', ingredient: 'oyster sauce', special: null},
            { quantity: 1, measurement: 'tbsp', ingredient: 'bean sauce', special: null},
            { quantity: 1, measurement: 'tbsp', ingredient: 'dark soy sace', special: null},
            { quantity: 5, measurement: null, ingredient: 'chili peppers', special: null},
            { quantity: 2, measurement: null, ingredient: 'garlic cloves', special: null},
            { quantity: 1, measurement: null, ingredient: 'green onions', special: '(for garnish)'},
            { quantity: 1, measurement: 'cup', ingredient: 'water', special: null},
            { quantity: 1, measurement: 'tbsp', ingredient: 'oil', special: null},
            { quantity: 1, measurement: 'tbsp', ingredient: 'sugar', special: null},
            { quantity: 0.5, measurement: 'tsp', ingredient: 'salt', special: null},
            { quantity: 1, measurement: 'tsp', ingredient: 'sesame oil', special: null},
            { quantity: 1, measurement: 'package', ingredient: 'tofu', special: null},
            { quantity: 1, measurement: 'cup', ingredient: 'onion', special: '(optional)'},
        ],
        steps: [
            {step: 1, instructions: 'Mince chicken thighs. Place chicken in a bowl and add cornstarch (1 tbsp), oyster sauce (1 tbsp), and water (2 tbsp). Let the marinade sit for about 5 minutes.Cut tofu into inch cubes.'},
            {step: 2, instructions: 'Mince garlic (2), chili peppers (to taste), and green onion (1). In a bowl, mix together cornstarch (1 tbsp) and water (2 tbsp) until you have an even consistency. Set aside.'},
            {step: 3, instructions: 'Using a wok on high heat, add oil (1 tbsp), garlic cloves (2), and chilies (2). Next, add the chicken and cook through.'},
            {step: 4, instructions: 'Add bean sauce (1 tbsp) and cook for 1 minute. Then, add water (1 cup), sugar (1 tbsp), salt (0.5 tsp), oyster sauce (1 tbsp), dark soy sauce (1 tbsp), and mix.'},
            {step: 5, instructions: 'Add tofu and gently stir to cover. Reduce heat, add lid and simmer for about 3 minutes.'},
            {step: 6, instructions: 'Slowly pour the cornstarch slurry. Top with sesame oil (1 tsp) and stir.'}
        ]
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

    const { id } = useParams();

    //Grab our data from the database
    //For now it is all in an array, so we need to iterate over that array
    //Once we have a DB setup, we will be able to just make calls to it instead
    let recipeData = [];
    for(let i=0; i < testData.length; i++){
        if(testData[i].id === parseInt(id, 0)){
            recipeData = testData[i];
        }
    }
    
    //If we don't find any data, send us back to the home page
    if(recipeData.length === 0){
        return <Redirect to='/' exact />
    }

    return(
        <div className='RecipePageDetails'>
            <Container className='RecipePageDetails-Container'>
                <Row>
                    <Col xs={12} md={4}>
                        <div className='RecipePageDetails-IngredientsList text-center'>
                            <h1 className='RecipePageDetails-Title'>{recipeData.foodTitle}</h1>
                            <IngredientList ingredients={recipeData.ingredients} />
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <div>
                            <RecipeDetails details={recipeData}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RecipeDetailsPage;
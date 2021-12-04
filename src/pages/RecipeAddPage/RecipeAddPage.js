import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import './RecipeAddPage.css'

const RecipeAddPage = props =>{

    const [ numberOfSteps, setNumberOfSteps ] = useState(1);
    const [ numberOfIngredients, setNumberOfIngredients ] = useState(1);
    const [ recipeSteps, setRecipeSteps ] = useState([]);
    const [ recipeIngredients, setRecipeIngredients ] = useState([]);
    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ recipeDesc, setRecipeDesc ] = useState('');
    //const [ recipeImage, setRecipeImage ] = useState('');
    const [ tags, setTags ] = useState([]);

    const uploadDate = new Date();

    const updateRecipeIngredients = (index, value) => {
        const stateClone = [ ...recipeIngredients ];

        stateClone[index] = value;

        setRecipeIngredients(stateClone);

    }

    const updateRecipeSteps = (index, value) => {
        const stateClone = [ ...recipeSteps ];

        stateClone[index] = value;

        setRecipeSteps(stateClone);
    }

    let recipeStepInputs = [];
    for( let i = 0; i < numberOfSteps; i++ ){
        recipeStepInputs.push(
            <Form.Group className="mb-3" id={i}>
                <Form.Label>Ingredient {i+1}</Form.Label>
                <Form.Control type="Text" placeholder={`Ingredient ${i+1}`} onChange={e => updateRecipeIngredients(i, e.target.value)}/>
            </Form.Group>
        )
    }

    let recipeIngredientInputs = [];
    for( let i = 0; i < numberOfIngredients; i++ ){
        recipeIngredientInputs.push(
            <Form.Group className="mb-3" id={i}>
                <Form.Label>Step {i+1}</Form.Label>
                <Form.Control type="Text" placeholder={`Step ${i+1}`}  onChange={ e => updateRecipeSteps(i, e.target.value)} />
            </Form.Group>
        )
    }

    console.log(numberOfSteps, numberOfIngredients);
    console.log(recipeIngredients, recipeSteps);
    console.log(recipeTitle, recipeDesc);
    console.log(tags);



    return (
        <Form>
            <Form.Group className="mb-3" controlId="recipeUpload.ControlInput1">
                <Form.Label onChange={ e => setRecipeTitle(e.target.value) }>Recipe Title</Form.Label>
                <Form.Control type="text" placeholder="Recipe Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeUpload.ControlInput2">
                <Form.Label onChange={ e => setRecipeDesc(e.target.value) }>Recipe Desc</Form.Label>
                <Form.Control type="text" placeholder="Recipe Desc" />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="recipeUpload.ControlInput3">
                        <Form.Label>Number of Ingredients</Form.Label>
                        <Form.Control type="number" placeholder="Number of Ingredients" onChange={ e => setNumberOfIngredients(e.target.value) }/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="recipeUpload.ControlInput4">
                        <Form.Label>Number of Steps</Form.Label>
                        <Form.Control type="number" placeholder="Number of Steps" onChange={ e => setNumberOfSteps(e.target.value) }/>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Recipe Image</Form.Label>
                <Form.Control type="file" />
            </Form.Group>

            {recipeStepInputs}

            {recipeIngredientInputs}

            <Form.Group className="mb-3">
                <Form.Label onChange={ e => setTags(e.target.value) }>Recipe Tags</Form.Label>
                <Form.Control type="text" placeholder="Recipe Tags" />
            </Form.Group>
        
        </Form>
    )
}

export default RecipeAddPage;
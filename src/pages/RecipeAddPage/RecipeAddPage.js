import React, { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './RecipeAddPage.css'

const RecipeAddPage = props =>{

    const { userState } = useContext(AuthContext);

    const [ numberOfSteps, setNumberOfSteps ] = useState(1);
    const [ numberOfIngredients, setNumberOfIngredients ] = useState(1);
    const [ recipeSteps, setRecipeSteps ] = useState([]);
    const [ recipeIngredients, setRecipeIngredients ] = useState([]);
    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ recipeDesc, setRecipeDesc ] = useState('');
    //const [ recipeImage, setRecipeImage ] = useState('');
    const [ tags, setTags ] = useState([]);

    const { submitting, error, sendRequest } = useHttp();

    // const [ submitting, setSubmitting ] = useState(false);
    // const [ error, setError ] = useState('');
    // const genericErrorMsg = 'Something went wrong; please try again later';

    const uploadDate = new Date();

    const updateRecipeIngredients = (index, value) => {
        const stateClone = [ ...recipeIngredients ];

        stateClone[index] = {id: index + 1, value};

        setRecipeIngredients(stateClone);
    }

    const updateRecipeSteps = (index, value) => {
        const stateClone = [ ...recipeSteps ];

        stateClone[index] = {id: index + 1, value};

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

    const submitRecipeToServer = async e => {
        e.preventDefault();

        //Put together what we will send to the server
        const JSONbody = {
            numberOfIngredients,
            numberOfSteps,
            recipeIngredients,
            recipeSteps,
            recipeTitle,
            recipeDesc,
            tags,
            uploadDate
        }

        //Reach out to our server
        const sendToServer = async () => {
            try{
                await sendRequest(process.env.REACT_APP_API_ENDPOINT + '/recipes/add', 'POST', {'Content-Type': 'application/json'}, JSON.stringify(JSONbody));
            } catch(err){
                //Errors handled in hook
            }
        }
        sendToServer();
        


    //     fetch(process.env.REACT_APP_API_ENDPOINT + '/recipes/add', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(JSONbody)
    //     })
    //         .then(async response => {
    //             //We have our response, no longer submitting
    //             setSubmitting(false);

    //             //Check if we got a good response or not. If we did, set an error message
    //             if(response.ok === false){
    //                 if(response.status === 400){
    //                     setError('Please fill in all the fields.');
    //                 } else {
    //                     setError(genericErrorMsg);
    //                 }
    //             } 
    //         })
    //         .catch(err => {
    //             setSubmitting(false);
    //             setError(genericErrorMsg);
    //         })
    }

    //If they are not an admin, they should not be able to get here
    //Will need to safeguard on the API route as well incase they are able to manipulate the state somehow
    if(!userState.isAdmin){
        return <div>Access Denied.</div>
    }

    return (<>
        <h1>{ error }</h1>
        <Form>
            <Form.Group className="mb-3" controlId="recipeUpload.ControlInput1">
                <Form.Label>Recipe Title</Form.Label>
                <Form.Control type="text" placeholder="Recipe Name"  onChange={ e => setRecipeTitle(e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeUpload.ControlInput2">
                <Form.Label>Recipe Desc</Form.Label>
                <Form.Control type="text" placeholder="Recipe Desc"  onChange={ e => setRecipeDesc(e.target.value) }/>
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
                <Form.Label>Recipe Tags</Form.Label>
                <Form.Control type="text" placeholder="Recipe Tags" onChange={ e => setTags(e.target.value) }/>
            </Form.Group>

            <Button onClick={submitRecipeToServer}>{ submitting ? 'Submitting...' : 'Submit' }</Button>
        
        </Form>
    </>)
}

export default RecipeAddPage;
import React, { useState, useContext, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './RecipeAddPage.css'

const RecipeAddPage = props =>{

    const { userState } = useContext(AuthContext);
    const { submitting, error, sendRequest } = useHttp();

    const [ numberOfSteps, setNumberOfSteps ] = useState(1);
    const [ numberOfIngredients, setNumberOfIngredients ] = useState(1);
    const [ recipeSteps, setRecipeSteps ] = useState([]);
    const [ recipeIngredients, setRecipeIngredients ] = useState([]);
    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ recipeDesc, setRecipeDesc ] = useState('');
    const [ bookSelection, setBookSelection ] = useState('');
    const [ recipeImage, setRecipeImage ] = useState('');
    const [ tags, setTags ] = useState([]);
    const [ localError, setLocalError ] = useState('');
    const [ imagePreview, setImagePreview ] = useState();
    const [ books, setBooks ] = useState([]);

    useEffect( () => {
        //Get our books that can be chosen as a source for the recipe
        const getFromServer = async() => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'books/getAllBooks');
                setBooks(responseData);
            } catch(err){
                //Errors handled in hook
            }
        }
        getFromServer();
    // eslint-disable-next-line 
    },[setBooks])

    useEffect(()=>{
        //Display a preview of our image
        if(!recipeImage){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImagePreview(fileReader.result);
        };
        fileReader.readAsDataURL(recipeImage);

    }, [sendRequest, recipeImage]);

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

    const submitRecipeImage = image =>{
        console.log(image);
        if(image && image.length === 1){
            const chosenFile = image[0];
            setRecipeImage(chosenFile);
        } else {
            setRecipeImage(undefined);
        }
    }

    const submitRecipeToServer = async e => {
        e.preventDefault();

        //Make sure we have good entries on the front end
        if( (numberOfSteps  < 1 || numberOfIngredients < 1) || ( recipeIngredients.length === 0 || recipeSteps.length === 0) || ( recipeTitle === '' || recipeDesc === '')){
            return setLocalError('All fields must be filled out');
        }

        let modifiedTags = tags.split(',');

        //Put together what we will send to the server
        const JSONbody = {
            numberOfIngredients,
            numberOfSteps,
            recipeIngredients,
            recipeSteps,
            recipeTitle,
            recipeDesc,
            modifiedTags,
            bookSelection,
            recipeImage,
            recipeRating: 0
        }

        //Reach out to our server
        const sendToServer = async () => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/add', 'POST', 'include', {'Content-Type': 'application/json', Authorization: `Bearer ${userState.token}`}, JSON.stringify(JSONbody), true);
                console.log(responseData);
            } catch(err){
                //Errors handled in hook
            }
        }
        sendToServer();
        
    }

    //If they are not an admin, they should not be able to get here
    //Will need to safeguard on the API route as well incase they are able to manipulate the state somehow
    if(!userState.isAdmin){
        return <div>Access Denied.</div>
    }

    //Create our list of book options
    let bookOptions = books.map( book => {
        return <option value={book._id}>{book.bookTitle}</option>
    })

    return (<>
        <h1>{ error || localError }</h1>
        <Form className='recipePageAdd'>
            <Row>
                { imagePreview && <img src={imagePreview } className='recipePageAdd-Image' alt='Recipe Preview' /> }
                { !imagePreview && <p>Please pick an image to see a preview</p> }
            </Row>
            <Row>
                <Col xs='6'>
                    <Form.Group className="mb-3" controlId="recipeUpload.ControlInput1">
                        <Form.Label>Recipe Title</Form.Label>
                        <Form.Control type="text" placeholder="Recipe Name"  onChange={ e => setRecipeTitle(e.target.value) }/>
                    </Form.Group>
                </Col>
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

            <Form.Group className="mb-3" controlId="recipeUpload.ControlInput2">
                <Form.Label>Recipe Desc</Form.Label>
                <Form.Control as='textarea' type="text" placeholder="Recipe Desc"  onChange={ e => setRecipeDesc(e.target.value) }/>
            </Form.Group>

            

            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Recipe Image</Form.Label>
                        <Form.Control type="file" name='recipeImage' accept='.jpg,.png,.jpeg' onChange={  e => submitRecipeImage(e.target.files) }/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Label>Recipe Book</Form.Label>
                    <Form.Select aria-label="Select Recipe Book" onChange={ e => setBookSelection(e.target.value) }>
                        <option>Select a Recipe Book</option>
                        {bookOptions}
                    </Form.Select>
                </Col>
            </Row>

            {recipeStepInputs}

            {recipeIngredientInputs}

            <Form.Group className="mb-3">
                <Form.Label>Recipe Tags</Form.Label>
                <Form.Control type="text" placeholder="Recipe Tags" onChange={ e => setTags(e.target.value) }/>
            </Form.Group>

            <Button type='button' onClick={submitRecipeToServer}>{ submitting ? 'Submitting...' : 'Submit' }</Button>
        
        </Form>
    </>)
}

export default RecipeAddPage;
import React, { useState, useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

import { v4 as uuid } from 'uuid';

import TabbedEntry from '../../Shared/components/TabbedEntry/TabbedEntry';
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './RecipeAddPage.css'

const RecipeAddPage = props =>{

    const { userState } = useContext(AuthContext);
    const { submitting, error, sendRequest } = useHttp();

    const emptyRecipe = {bookSelection: '', recipeDesc: '', recipeImage: '', recipeTitle: '',  recipeIngredients: [{value: ''}], recipeSteps: [{value: ''}], recipeTags: '', recipeBook: { _id: 0}};

    const [ numberOfSteps, setNumberOfSteps ] = useState(1);
    const [ numberOfIngredients, setNumberOfIngredients ] = useState(1);
    const [ recipeImage, setRecipeImage ] = useState('');
    const [ localError, setLocalError ] = useState('');
    const [ imagePreview, setImagePreview ] = useState();
    const [ books, setBooks ] = useState([]);
    const [ loadedRecipe, setLoadedRecipe ] = useState(emptyRecipe);

    const { id } = useParams();
    const history = useHistory();

    //If we are editing a recipe, we need to get those details
    useEffect(() => {
        //Reach out to our server
        if(props.edit !== undefined){
            const callToServer = async() => {
                try{
                    const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/getOneRecipe/' + id);
                    setLoadedRecipe({...responseData, recipeTags: responseData.recipeTags.join(','), bookSelection: responseData.recipeBook._id});
                    setNumberOfIngredients(responseData.recipeIngredients.length);
                    setNumberOfSteps(responseData.recipeSteps.length)

                } catch(err){
                    //Errors handled in hook
                }
            }
            callToServer();
        } else {
            setLoadedRecipe(emptyRecipe);
        }
    //eslint-disable-next-line
    },[])

    //useEffect to get our list of book options
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

    //useEffect for our image processing
    useEffect( () => {
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

    const updateRecipeIngredientsOrSteps = (index, value, which) => {
        const stateClone = {...loadedRecipe};

        switch(which){
            case 'ingredient':
                stateClone.recipeIngredients[index] = {id: index + 1, value};
                setLoadedRecipe(stateClone);
                break;
            case 'step':
                stateClone.recipeSteps[index] = {id: index + 1, value};
                setLoadedRecipe(stateClone);
                break;
            default:
                setLocalError('Error updating ingredient and/or step')
        }
    }

    // const submitRecipeImage = image =>{
    //     if(image && image.length === 1){
    //         const chosenFile = image[0];
    //         setRecipeImage(chosenFile);
    //     } else {
    //         setRecipeImage(undefined);
    //     }
    // }

    const submitRecipeImage = image =>{
        const stateClone = { ...loadedRecipe };
        if(image && image.length === 1){
            stateClone.recipeImage = image[0]
            setLoadedRecipe(stateClone);
            setRecipeImage(image[0]);
        } else {
            stateClone.recipeImage = undefined;
            setLoadedRecipe(stateClone);
        }
    }

    const submitRecipeToServer = async e => {
        e.preventDefault();
        //Make sure we have good entries on the front end
        if( (numberOfSteps  < 1 || numberOfIngredients < 1) || ( loadedRecipe.recipeIngredients.length === 0 || loadedRecipe.recipeSteps.length === 0) || ( loadedRecipe.recipeTitle === '' || loadedRecipe.recipeDesc === '' || loadedRecipe.recipeImage === '' || loadedRecipe.bookSelection === '' ) ){
            return setLocalError('All fields must be filled out');
        }

        let recipeTags = loadedRecipe.recipeTags.split(',');

        const formData = new FormData();
        formData.append('recipeIngredients', JSON.stringify(loadedRecipe.recipeIngredients));
        formData.append('recipeSteps', JSON.stringify(loadedRecipe.recipeSteps));
        formData.append('recipeTitle', loadedRecipe.recipeTitle);
        formData.append('recipeDesc', loadedRecipe.recipeDesc);
        formData.append('recipeTags', recipeTags);
        formData.append('bookSelection', loadedRecipe.bookSelection);
        formData.append('recipeImage', loadedRecipe.recipeImage);

        let URL = process.env.REACT_APP_API_ENDPOINT + 'recipes/add';
        let method = 'POST'
        if(props.edit){ 
            URL = process.env.REACT_APP_API_ENDPOINT + 'recipes/UpdateOneRecipe/' + id;
            method = 'PUT' 
        }

        //Reach out to our server
        const sendToServer = async () => {
            try{
                const responseData = await sendRequest(URL, method, 'include', { Authorization: `Bearer ${userState.token}`}, formData, true);

                if(responseData){
                    //Add logic for redirecting upon receipt of our success from server
                    history.push('/recipes/view/' + responseData.id);                    
                }
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
        return <option key={uuid()} value={book._id}>{book.bookTitle}</option>
    })

    return (<div className='recipePageAdd'>
        <div className='recipePageAdd-Header text-center'>Add a new recipe below</div>
        <Container>
            <h1>{ error || localError }</h1>
            <Form className='recipePageAdd-Form'>
                <Row>
                    { imagePreview && <img src={imagePreview } className='recipePageAdd-Image' alt='Recipe Preview' /> }
                    { !imagePreview && <p>Please pick an image to see a preview</p> }
                </Row>
                <Row>
                    <Col xs='6'>
                        <Form.Group className="mb-3" controlId="recipeUpload.ControlInput1">
                            <Form.Label>Recipe Title</Form.Label>
                            <Form.Control type="text" placeholder="Recipe Name" value={loadedRecipe.recipeTitle} onChange={ e => setLoadedRecipe({...loadedRecipe, recipeTitle: e.target.value}) }/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="recipeUpload.ControlInput3">
                            <Form.Label>Number of Ingredients</Form.Label>
                            <Form.Control type="number" min={1} value={numberOfIngredients} placeholder="Number of Ingredients" onChange={ e => setNumberOfIngredients(e.target.value) }/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="recipeUpload.ControlInput4">
                            <Form.Label>Number of Steps</Form.Label>
                            <Form.Control type="number" min={1} value={numberOfSteps} placeholder="Number of Steps" onChange={ e => setNumberOfSteps(e.target.value) }/>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="recipeUpload.ControlInput2">
                    <Form.Label>Recipe Desc</Form.Label>
                    <Form.Control as='textarea' type="text" value={loadedRecipe.recipeDesc} placeholder="Recipe Desc" onChange={ e => setLoadedRecipe({...loadedRecipe, recipeDesc: e.target.value}) }/>
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
                        <Form.Select aria-label="Select Recipe Book" value={loadedRecipe.bookSelection} onChange={ e => setLoadedRecipe({ ...loadedRecipe, bookSelection: e.target.value}) }>
                            <option>Select a Recipe Book</option>
                            {bookOptions}
                        </Form.Select>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label>Recipe Ingredients</Form.Label>
                        <TabbedEntry entries={numberOfIngredients} entryType='ingredient' updateRecipeSteps={updateRecipeIngredientsOrSteps} loadedDetails={props.edit && loadedRecipe.recipeIngredients} />
                    </Col>
                    <Col>
                        <Form.Label>Recipe Steps</Form.Label>
                        <TabbedEntry entries={numberOfSteps} entryType='step' updateRecipeSteps={updateRecipeIngredientsOrSteps} loadedDetails={props.edit && loadedRecipe.recipeSteps} />
                    </Col>
                </Row>


                <Form.Group className="mb-3">
                    <Form.Label>Recipe Tags</Form.Label>
                    <Form.Control type="text" value={loadedRecipe.recipeTags} placeholder="Recipe Tags" onChange={ e => setLoadedRecipe({...loadedRecipe, recipeTags: e.target.value}) }/>
                </Form.Group>

                <Button type='button' onClick={submitRecipeToServer}>{ submitting ? 'Submitting...' : 'Submit' }</Button>
            
            </Form>
        </Container>
        <div className='recipeAddPage-Warning text-center'>*** Please ensure that all of the above fields are filled out ***</div>
    </div>)
}

export default RecipeAddPage;
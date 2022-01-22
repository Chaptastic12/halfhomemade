import React, { useState, useContext, useEffect, useRef } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import IngredientList from '../../Shared/components/IngredientList/IngredientList';
import RecipeDetails from '../../Shared/components/RecipeDetails/RecipeDetails';
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

const RecipeDetailsPage = props =>{

    const { userState } = useContext(AuthContext);
    const { submitting, error, sendRequest } = useHttp();

    const inputFile = useRef(null);

    const emptyRecipe = {bookSelection: '', recipeDesc: '', recipeImage: '', recipeTitle: 'Set a title',  recipeIngredients: [{value: ''}], recipeSteps: [{value: ''}], recipeTags: '', recipeBook: { _id: 0}};

    const [ numberOfSteps, setNumberOfSteps ] = useState(1);
    const [ numberOfIngredients, setNumberOfIngredients ] = useState(1);
    const [ recipeImage, setRecipeImage ] = useState('');
    const [ localError, setLocalError ] = useState('');
    const [ imagePreview, setImagePreview ] = useState(process.env.REACT_APP_IMAGE_ENDPOINT + 'uploads/images/webp34dfb786-1b67-4f43-9ef4-8d36c804d52f.png');
    const [ books, setBooks ] = useState([]);
    const [ loadedRecipe, setLoadedRecipe ] = useState(emptyRecipe);
    const [ recipeImageChange, setRecipeImageChange ] = useState(false);

    //State that controls if we are showing, or editing, an input
    const [ editTitle, setEditTitle ] = useState(false);
    const [ editDesc, setEditDesc ] = useState(false);
    const [ editIngredients, setEditIngredients ] = useState(false);
    const [ editSteps, setEditSteps ] = useState(false);

    const { id } = useParams();
    const history = useHistory();

    //If we are editing a recipe, we need to get those details
    useEffect(() => {
        //Reach out to our server
        if(props.edit !== undefined){
            const callToServer = async() => {
                try{
                    const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/getOneRecipe/' + id);
                    setLoadedRecipe({...responseData, recipeTags: responseData.recipeTags.join(','), bookSelection: responseData.recipeBook.id});
                    setNumberOfIngredients(responseData.recipeIngredients.length);
                    setNumberOfSteps(responseData.recipeSteps.length);
                    responseData.recipeImage = process.env.REACT_APP_IMAGE_ENDPOINT + responseData.recipeImage.replace(/\\/g, '/');
                    setImagePreview(responseData.recipeImage);

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
                stateClone.recipeIngredients[index] = {id: index + 1, value: value};
                setLoadedRecipe(stateClone);
                break;
            case 'step':
                stateClone.recipeSteps[index] = {id: index + 1, value: value};
                setLoadedRecipe(stateClone);
                break;
            default:
                setLocalError('Error updating ingredient and/or step')
        }
    }

    const submitRecipeImage = image =>{
        setRecipeImageChange(true);
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
            if(recipeImageChange === false){
                formData.append('updateImage', false)
            } else {
                formData.append('updateImage', true)
            }
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
    // if(!userState.isAdmin){
    //     return <div>Access Denied.</div>
    // }

    //Create our list of book options
    let bookOptions = books.map( book => {
        return <option key={uuid()} value={book._id}>{book.bookTitle}</option>
    })

    console.log(loadedRecipe.recipeTitle)

    return(
        <div className='RecipePageDetails'>
            <Row>
                <Col xs={12} lg={5}>
                    <div className='RecipePageDetails-RecipeImage' style={{backgroundImage: 'URL(' + imagePreview + ')'}} onClick={() => inputFile.current.click()}>
                        <input id='file' type="file" ref={inputFile} name='recipeImage' accept='.jpg,.png,.jpeg,.webp' onChange={  e => submitRecipeImage(e.target.files) } style={{display: 'none'}} />
                    </div>
                </Col>
                <Col>
                    <div className='RecipePageDetails-RecipeInfo'>
                        { !editTitle ? 
                            <h1 className='RecipePageDetails-Title text-center' onClick={() => setEditTitle(true)}> {loadedRecipe.recipeTitle} </h1> 
                            : 
                            <input type='text' placeholder="Recipe Name" value={loadedRecipe.recipeTitle} 
                                onChange={ e => setLoadedRecipe({...loadedRecipe, recipeTitle: e.target.value})} 
                                onKeyDown={event => (event.key === 'Enter' ? setEditTitle(false) : null ) } 
                            /> 
                        }
                        {/* <br />
                        <div><IngredientList new ingredients={loadedRecipe.recipeIngredients} /></div>
                        <div><RecipeDetails new details={loadedRecipe.recipeSteps} /></div> */}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RecipeDetailsPage;
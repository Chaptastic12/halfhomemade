import React, { useState, useContext, useEffect, useRef } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import IngredientList from '../../Shared/components/IngredientList/IngredientList';
import RecipeDetails from '../../Shared/components/RecipeDetails/RecipeDetails';
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

const RecipeDetailsPage = props =>{

    const { userState } = useContext(AuthContext);
    const { sendRequest } = useHttp();

    const inputFile = useRef(null);

    const emptyRecipe = {bookSelection: '', recipeDesc: '', recipeImage: '', recipeTitle: '',  recipeIngredients: '', recipeSteps: '', recipeTags: '', recipeBook: { _id: 0}};

    const [ recipeImage, setRecipeImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState(process.env.REACT_APP_IMAGE_ENDPOINT + 'uploads/images/webp34dfb786-1b67-4f43-9ef4-8d36c804d52f.png');
    const [ books, setBooks ] = useState([]);
    const [ loadedRecipe, setLoadedRecipe ] = useState(emptyRecipe);
    const [ recipeImageChange, setRecipeImageChange ] = useState(false);
    const [ allowRecipeSubmit, setAllowRecipeSubmit ] = useState(false);

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

    //Verify that we should be able to submit recipe
    useEffect( () => {
        if( loadedRecipe.recipeIngredients !== '' && loadedRecipe.recipeSteps !== '' && loadedRecipe.recipeTitle !== '' && loadedRecipe.recipeDesc !== '' && loadedRecipe.recipeImage !== '' && loadedRecipe.bookSelection !== '' && loadedRecipe.recipeTags !== '' ){
            setAllowRecipeSubmit(true);
        } else {
            setAllowRecipeSubmit(false);
        }
    }, [loadedRecipe])

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

        let recipeTags = loadedRecipe.recipeTags.split(',');

        const formData = new FormData();
        formData.append('recipeIngredients', loadedRecipe.recipeIngredients);
        formData.append('recipeSteps', loadedRecipe.recipeSteps);
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
    if(!userState.isAdmin){
        return <div>Access Denied.</div>
    }

    //Create our list of book options
    let bookOptions = books.map( book => {
        return <option key={uuid()} value={book._id}>{book.bookTitle}</option>
    })

    let recipeTitleText, recipeStepText, recipeIngText, recipeDescText;
    if(loadedRecipe.recipeTitle.length > 0){ recipeTitleText = loadedRecipe.recipeTitle; } else { recipeTitleText = ''  }
    if(loadedRecipe.recipeIngredients.length > 0){ recipeIngText = loadedRecipe.recipeIngredients; } else { recipeIngText = ''  }
    if(loadedRecipe.recipeSteps.length > 0){ recipeStepText = loadedRecipe.recipeSteps; } else { recipeStepText = ''  }
    if(loadedRecipe.recipeDesc.length > 0){ recipeDescText = loadedRecipe.recipeDesc; } else { recipeDescText = ''  }

    return(
        <div className='RecipePageDetails'>
            <Row>
                <Col xs={12} lg={5}>
                    <div className='RecipePageDetails-RecipeImage' style={{backgroundImage: 'URL(' + imagePreview + ')'}} onClick={() => inputFile.current.click()}>
                        <input id='file' type="file" ref={inputFile} name='recipeImage' accept='.jpg,.png,.jpeg,.webp' onChange={  e => submitRecipeImage(e.target.files) } style={{display: 'none'}} />
                    </div>
                    
                    <div>
                        <Form.Label>Book Selection</Form.Label>
                        <Form.Select aria-label="Select Recipe Book" value={loadedRecipe.bookSelection} onChange={ e => setLoadedRecipe({ ...loadedRecipe, bookSelection: e.target.value}) }>
                            <option>Select a Recipe Book</option>
                            {bookOptions}
                        </Form.Select>
                        <Form.Label>Recipe Tags</Form.Label>
                        <Form.Control type="text" value={loadedRecipe.recipeTags} placeholder="Recipe Tags" onChange={ e => setLoadedRecipe({...loadedRecipe, recipeTags: e.target.value}) }/>
                    </div>
                </Col>
                <Col>
                    <div className='RecipePageDetails-RecipeInfo'>
                        { !editTitle ? 
                            <h1 className='RecipePageDetails-Title text-center' onClick={() => setEditTitle(true)}> {loadedRecipe.recipeTitle.length > 0 ? loadedRecipe.recipeTitle : 'Enter recipe name' } </h1> 
                            : 
                            <div className='d-flex justify-content-center align-items-center'>
                                <input type='text' placeholder="Recipe Name" value={recipeTitleText} 
                                    onChange={ e => setLoadedRecipe({...loadedRecipe, recipeTitle: e.target.value})} 
                                    onKeyDown={event => (event.key === 'Enter' && event.shiftKey ? setEditTitle(false) : null ) } 
                                /> 
                            </div>
                        }
                        <br />
                        <div>
                            <div className='IngredientList text-center'>
                                <h1><hr className='hr' style={{float: 'left' }}/>Description<hr className='hr' style={{float: 'right' }}/></h1>
                            </div>
                            { !editDesc ? 
                                <p className='text-center' onClick={() => setEditDesc(true)}>{ loadedRecipe.recipeDesc.length > 0 ? loadedRecipe.recipeDesc : 'Enter recipe desc' }</p>
                                :
                                <div className='d-flex justify-content-center align-items-center'>
                                    <textarea placeholder="Recipe Description" value={recipeDescText} cols={70} rows={3}
                                        onChange={ e => setLoadedRecipe({...loadedRecipe, recipeDesc: e.target.value})} 
                                        onKeyDown={event => (event.key === 'Enter' && event.shiftKey ? setEditDesc(false) : null ) } 
                                    /> 
                                </div>
                            }
                        </div>
                        <div className='IngredientList text-center'>
                            <h1><hr className='hr' style={{float: 'left' }}/>Ingredients<hr className='hr' style={{float: 'right' }}/></h1>
                        </div>
                        { !editIngredients ?
                             <div onClick={()=> setEditIngredients(true)}>
                                 { loadedRecipe.recipeIngredients === '' ? <p className='text-center'>Click to enter ingredients</p> : <IngredientList ingredients={loadedRecipe.recipeIngredients} /> }
                             </div>
                             :
                             <>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <textarea placeholder="Recipe Ingredients" value={recipeIngText} cols={70} rows={10}
                                        onChange={ e => setLoadedRecipe({...loadedRecipe, recipeIngredients: e.target.value})}
                                        onKeyDown={event => (event.key === 'Enter' && event.shiftKey ? setEditIngredients(false) : null )} 
                                    /> 
                                </div> 
                            </>
                        }
                        { !editSteps ?
                            <div onClick={() => setEditSteps(true)}>
                                <RecipeDetails details={loadedRecipe.recipeSteps} />
                            </div> 
                            :
                            <>
                                <div className='RecipeDetails-header text-center'>
                                    <h1><hr className='hr' style={{float: 'left' }}/>Instructions<hr className='hr' style={{float: 'right' }}/></h1>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <textarea placeholder="Recipe Steps" value={recipeStepText} cols={70} rows={10}
                                        onChange={ e => setLoadedRecipe({...loadedRecipe, recipeSteps: e.target.value})}
                                        onKeyDown={event => (event.key === 'Enter' && event.shiftKey ? setEditSteps(false) : null )} 
                                    /> 
                                </div> 
                            </>
                        }
                    </div>
                    <br />
                    { ( editTitle || editDesc || editIngredients || editSteps ) ? 
                        <div>
                            <Button onClick={() => { setEditTitle(false); setEditIngredients(false); setEditSteps(false); setEditDesc(false) }}>Cancel</Button>
                            <span>Hit shift + enter to confirm on the above entries</span>
                        </div> 
                        :
                        <Button onClick={e => submitRecipeToServer(e)} disabled={!allowRecipeSubmit}>Submit</Button>
                        }
                </Col>
            </Row>
        </div>
    )
}

export default RecipeDetailsPage;
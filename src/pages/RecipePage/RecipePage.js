import React, { useState, useEffect, useContext } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';
import RecipeSearch from '../../Shared/components/RecipeSearch/RecipeSearch';
import PaginationComponent from '../../Shared/components/UI Elements/Pagination/Pagination';

import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap'

import { AuthContext } from '../../Shared/context/auth-context';
import { SearchContext } from '../../Shared/context/search-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './RecipePage.css';

const ITEMS_PER_PAGE = 8;

const RecipePage = props =>{

    const { userState } = useContext(AuthContext);
    const { searchParam, searchItem } = useContext(SearchContext)
    const { sendRequest } = useHttp();

    const [ loadedRecipes, setLoadedRecipes ] = useState([]);
    const [ allRecipes, setAllRecipes ] = useState([]);
    const [ deletedRecipe, setDeletedRecipe ] = useState(false);
    const [ localError, setLocalError ] = useState('');
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ books, setBooks ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const recipeSearchHandler = ( title, tag, book, rating ) => {
        let searchedRecipe = [ ...allRecipes];
        setLocalError('');     

        if(title !== null || ''){
            searchedRecipe = searchedRecipe.filter(x => x.recipeTitle.toLowerCase().includes(title.toLowerCase()));
        }

        if(book !== null || ''){
            searchedRecipe = searchedRecipe.filter(x => x.recipeBook.id.includes(book))
        }
        
        if(tag !== null || ''){
            searchedRecipe = searchedRecipe.filter(x => x.recipeTags[0].toLowerCase().includes(tag.toLowerCase()));
        }

        if(rating !== null ||   0){
            searchedRecipe = searchedRecipe.filter(x => x.recipeRating >= rating)
        }

        if(searchedRecipe.length > 0){
            setLoadedRecipes(searchedRecipe);
            setLoading(false);
        } else {
            setLocalError('No recipes found that match your search criteria.')
            setLoadedRecipes(allRecipes);
            setLoading(false);
        }
    }

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

    //Make a call to our API to get our recipes
    useEffect(() => {
            //Reach out to our server
            const callToServer = async() => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/showAllRecipes');
                //Update state for the recipes we show; Keep a back up of all our recipes for searching.
                setLoadedRecipes(responseData);
                setAllRecipes(responseData);
            } catch(err){ /* Errors handled in hook */ }
        }
        callToServer();
        setDeletedRecipe(false);

    },[deletedRecipe, sendRequest, setLoadedRecipes]);

    //Check if we are filtering down via the URL
    useEffect(() => {
        setTimeout(() => {
            if(searchParam !== null){
                if(allRecipes){
                    switch(searchParam){
                        case 'tag':
                            setLoading(true);
                            recipeSearchHandler(null, searchItem, null, null);
                            break;
                        case 'book':
                            setLoading(true);
                            recipeSearchHandler(null, null, searchItem, null);
                            break;
                        default:
                            break;
                    }
                }
            }else{
                setLoadedRecipes(allRecipes);
            }
        }, 175);

    //eslint-disable-next-line
    }, [allRecipes, searchParam, searchItem])

    let recipeCardFormat;
    //Project the site if the server goes down
    if(loadedRecipes){
        const indexStart = (~ITEMS_PER_PAGE + 1) + (ITEMS_PER_PAGE * pageNumber);
        const indexEnd = indexStart + ITEMS_PER_PAGE;

        const serverRecipes = loadedRecipes.slice(indexStart, indexEnd).map(recipe => {
            //Update the URl for our images and how the createdAt is formatted.
            recipe.recipeBook.bookImage = recipe.recipeBook.bookImage.replace(/\\/g, '/');
            recipe.recipeImage = recipe.recipeImage.replace(/\\/g, '/');
            recipe.createdAt = recipe.createdAt.toString().split('T')[0];
            return <RecipeCard
                data={recipe}
                key={recipe._id}
                delete={() => setDeletedRecipe(true)} 
                adminPage={props.admin}/>
        })
        recipeCardFormat = <Row>{serverRecipes}</Row>
    } else {
        recipeCardFormat = <Row>EROR: UNABLE TO REACH SITE...</Row>
    }

    const numberOfPages = Math.ceil((loadedRecipes.length)/ITEMS_PER_PAGE)

    if(props.admin){
        return <div className='RecipePage'> { recipeCardFormat } </div>
    } else {
        return(
            <div className='RecipePage'>
                <Container>
                    { localError && <div>{ localError } </div> }
                    {/* <PageHeader backgroundImage={loadedFoodPlatter}/>  */}
                    <div className='RecipePage-Title'>Recipes from around the world</div>
                    <Row>
                        <Col xs={3}><span className='RecipePage-SubTitle'>Ready for you, right here</span></Col>
                        <Col>
                            <RecipeSearch books={books} submitRecipeSearch={(title, tag, book, rating)=> recipeSearchHandler(title, tag, book, rating)} />
                        </Col>
                    </Row>
                    {/* <RecipeSearch submitRecipeSearch={(title, tag)=> recipeSearchHandler(title, tag)} /> */}
                    { ( loadedRecipes && !loading ) && recipeCardFormat }
                    { loadedRecipes && <PaginationComponent active={pageNumber} changePage={(num) => setPageNumber(num)} number={numberOfPages} /> }
                    { userState.isAdmin && <Button as={NavLink} to='/recipes/add'>Add Recipe</Button> }
                </Container>
            </div>
        )
    }

    
}

export default RecipePage;
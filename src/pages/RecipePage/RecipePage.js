import React, { useState, useEffect, useContext } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';
import RecipeSearch from '../../Shared/components/RecipeSearch/RecipeSearch';
import PaginationComponent from '../../Shared/components/UI Elements/Pagination/Pagination';
import AlertDisplay from '../../Shared/components/UI Elements/Alert/AlertDisplay';

import { NavLink } from 'react-router-dom';
import { Container, Row, Button, Spinner } from 'react-bootstrap'

import { AuthContext } from '../../Shared/context/auth-context';
import { SearchContext } from '../../Shared/context/search-context';
import { ServerContext } from '../../Shared/context/server-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './RecipePage.css';

const ITEMS_PER_PAGE = 8;

const RecipePage = props =>{

    const { userState } = useContext(AuthContext);
    const { searchParam, searchItem } = useContext(SearchContext);
    const { books, allRecipes, getRecipesFromServer } = useContext(ServerContext)

    const { error } = useHttp();

    const [ loadedRecipes, setLoadedRecipes ] = useState([]);
    const [ deletedRecipe, setDeletedRecipe ] = useState(false);
    const [ localError, setLocalError ] = useState('');
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ loading, setLoading ] = useState(true);

    useEffect(() =>{
        window.scrollTo(0,0);
    });

    const recipeSearchHandler = ( title, tag, book, rating ) => {
        setLoading(true);       
        setLocalError('');     

        let searchedRecipe = [ ...allRecipes ];

        //Check if we need to filter all the recipes down if we have a valid title parameter
        if((title != null) && (title.length > 0)){
            searchedRecipe = searchedRecipe.filter(x => x.recipeTitle.toLowerCase().includes(title.toLowerCase()));
        }
        //Of the recipes that we filtered (or didn't filter) from the above, filter down again if we are searching by a valid book parameter
        if((book != null) && (book.length > 0) && (book !== undefined) && (book !=='all')){
            searchedRecipe = searchedRecipe.filter(x => x.recipeBook.id.includes(book));
        }
        //Of the recipes that we filtered (or didn't filter) from the above, filter down again if we are searching by a valid tag parameter
        if((tag != null) && (tag.length >0)){
            searchedRecipe = searchedRecipe.filter(x => x.recipeTags[0].toLowerCase().includes(tag.toLowerCase()));
        }
        //Of the recipes that we filtered (or didn't filter) from the above, filter down again if we are searching by a valid rating parameter
        if((rating != null) && (rating !== 0) && (rating !== '0')){
            searchedRecipe = searchedRecipe.filter(x =>  x.recipeRating >= parseInt(rating) && x.recipeRating < ( parseInt(rating) + 1 ) );
        }

        //If, after all the above, we still have recipes remaining, set the created array as our new loadedRecipes
        //Otherwise, no recipes were found and we will just display all of them
        if(searchedRecipe.length > 0){
            setLoadedRecipes(searchedRecipe);
        } else {
            setLocalError('No recipes found that match your search criteria; Showing all recipes')
            setLoadedRecipes(allRecipes);
        }
        setLoading(false);
    }

    //Check if we are filtering down via the URL
    useEffect(() => {
        if((searchParam !== null) && (allRecipes.length > 0)){
            switch(searchParam){
                case 'text':
                    recipeSearchHandler(searchItem, null, null, null);
                    break;
                case 'tag':
                    recipeSearchHandler(null, searchItem, null, null);
                    break;
                case 'book':
                    recipeSearchHandler(null, null, searchItem, null);
                    break;
                case 'stars':
                    recipeSearchHandler(null, null, null, searchItem);
                    break;
                default:
                    break;
            }
        }else{
            setLoadedRecipes(allRecipes);
            setLoading(false);
        }
        //Check if we have deleted any recipes or not
        if(deletedRecipe){
            getRecipesFromServer();
            setLoadedRecipes(allRecipes);
        }
        setDeletedRecipe(false);
    //eslint-disable-next-line
    }, [deletedRecipe, allRecipes, searchParam, searchItem]); 

    //After making our API calls, check if we got an error.
    useEffect(()=>{
        if(error){
            setLocalError(error);
        }
    }, [error])

    let serverRecipes, numberOfPages;
    //Protect the site if the server goes down
    if(loadedRecipes && !loading){
        const indexStart = (~ITEMS_PER_PAGE + 1) + (ITEMS_PER_PAGE * pageNumber);
        const indexEnd = indexStart + ITEMS_PER_PAGE;
        numberOfPages = Math.ceil((loadedRecipes.length)/ITEMS_PER_PAGE)

        serverRecipes = loadedRecipes.slice(indexStart, indexEnd).map(recipe => {
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
    } 

    return(
        <div className='RecipePage'>
            <div className='Title'>
                <span className='Words'>Recipes from around the world </span>
            </div>
            { loadedRecipes && !loading ? <>
                <div className='Search'>
                    <RecipeSearch books={books} submitRecipeSearch={(title, tag, book, rating)=> recipeSearchHandler(title, tag, book, rating)} existingData={{searchParam, searchItem}} />
                </div>
                <Container>
                    { localError && <AlertDisplay lg={true} closeAlert={(x) => setLocalError('')}  alertText={localError} /> }
                     <Row>{serverRecipes}</Row> 
                    <div className='d-flex justify-content-end'> 
                        <PaginationComponent active={pageNumber} changePage={(num) => setPageNumber(num)} number={numberOfPages} />
                    </div>
                    { userState.isAdmin && <Button as={NavLink} to='/recipes/add'>Add Recipe</Button> }
                </Container> 
            </> : <>
                { localError && <AlertDisplay lg={true} closeAlert={(x) => setLocalError('')}  alertText={localError} /> }
                <div className='Spinner'>
                    <Spinner animation="border" role="status" />
                    <div>Loading...</div>
                </div>
            </> }
        </div>
    )
}

export default RecipePage;
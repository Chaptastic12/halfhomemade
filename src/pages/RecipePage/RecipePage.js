import React, { useState, useEffect, useContext } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';
import RecipeSearch from '../../Shared/components/RecipeSearch/RecipeSearch';
import PaginationComponent from '../../Shared/components/UI Elements/Pagination/Pagination';

import { NavLink } from 'react-router-dom';
import { Container, Row, Button } from 'react-bootstrap'

import { AuthContext } from '../../Shared/context/auth-context';
import { SearchContext } from '../../Shared/context/search-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './RecipePage.css';

const ITEMS_PER_PAGE = 8;

const RecipePage = props =>{

    const { userState } = useContext(AuthContext);
    const { searchParam, searchItem } = useContext(SearchContext);

    const { sendRequest } = useHttp();

    const [ loadedRecipes, setLoadedRecipes ] = useState([]);
    const [ allRecipes, setAllRecipes ] = useState([]);
    const [ deletedRecipe, setDeletedRecipe ] = useState(false);
    const [ localError, setLocalError ] = useState('');
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ books, setBooks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    //const [ filterText, setFilterText ] = useState('')

    const recipeSearchHandler = ( title, tag, book, rating ) => {
        setLoading(true);       
        setLocalError('');     

        //let text = [];
        let searchedRecipe = [ ...allRecipes ];

        //Check if we need to filter all the recipes down if we have a valid title parameter
        if(title != null){
            if(title.length > 0 ){
                searchedRecipe = searchedRecipe.filter(x => x.recipeTitle.toLowerCase().includes(title.toLowerCase()));
                //text.push('containing ' + title);
            }
        }
        //Of the recipes that we filtered (or didn't filter) from the above, filter down again if we are searching by a valid book parameter
        if(book != null){
            if(book.length > 0){
                if(book !== undefined ){
                    searchedRecipe = searchedRecipe.filter(x => x.recipeBook.id.includes(book._id));
                    //text.push('found in ' + book.bookTitle);
                }
            }
        }
        //Of the recipes that we filtered (or didn't filter) from the above, filter down again if we are searching by a valid tag parameter
        if(tag != null){
            if(tag.length > 0 ){
                searchedRecipe = searchedRecipe.filter(x => x.recipeTags[0].toLowerCase().includes(tag.toLowerCase()));
                //text.push('with tag ' + tag);
            }
        }
        //Of the recipes that we filtered (or didn't filter) from the above, filter down again if we are searching by a valid rating parameter
        if(rating != null){
            if(rating !== 0){ 
                if(rating !== '0'){
                    searchedRecipe = searchedRecipe.filter(x =>  x.recipeRating >= parseInt(rating) && x.recipeRating <= parseInt(rating) );
                    //text.push('and a rating of ' + rating);
                }
            }
        }

        //If, after all the above, we still have recipes remaining, set the created array as our new loadedRecipes
        //Otherwise, no recipes were found and we will just display all of them
        if(searchedRecipe.length > 0){
            setLoadedRecipes(searchedRecipe);
            //setFilterText(text.join(', '));
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
                setAllRecipes(responseData);
                if(searchParam === null){
                    setLoadedRecipes(responseData);
                    setLoading(false)
                }
            } catch(err){ /* Errors handled in hook */ }
        }
        callToServer();
        setDeletedRecipe(false);

    },[deletedRecipe, searchParam, sendRequest, setLoadedRecipes]);

    //Check if we are filtering down via the URL
    useEffect(() => {
        if(searchParam !== null){
            if(allRecipes.length > 0){
                switch(searchParam){
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
            }
        }else{
            //setFilterText('')
            setLoadedRecipes(allRecipes);
        }

    //eslint-disable-next-line
    }, [allRecipes, searchParam, searchItem ]);  

    let recipeCardFormat;
    //Protect the site if the server goes down
    if(loadedRecipes && !loading){
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
                <div className='Title'>
                    <span className='Words'>Recipes from around the world </span>
                </div>
                <div className='Search'>
                    <RecipeSearch books={books} submitRecipeSearch={(title, tag, book, rating)=> recipeSearchHandler(title, tag, book, rating)} existingData={{searchParam, searchItem}} />
                </div>
                <Container>
                    { localError && <div>{ localError } </div> }
                    { ( loadedRecipes && !loading ) && recipeCardFormat }
                    { loadedRecipes && <PaginationComponent active={pageNumber} changePage={(num) => setPageNumber(num)} number={numberOfPages} /> }
                    { userState.isAdmin && <Button as={NavLink} to='/recipes/add'>Add Recipe</Button> }
                </Container>
            </div>
        )
    }
    
}

export default RecipePage;
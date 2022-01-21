import React, { useState, useEffect } from 'react';

import RecipeCard from '../../Shared/components/RecipeCard/RecipeCard';
import RecipeSearch from '../../Shared/components/RecipeSearch/RecipeSearch';
import PaginationComponent from '../../Shared/components/UI Elements/Pagination/Pagination';

import { Container, Row, Col } from 'react-bootstrap'

import { useHttp } from '../../Shared/hooks/http-hook';

import './RecipePage.css';

const ITEMS_PER_PAGE = 4;

const RecipePage = props =>{

    const { sendRequest } = useHttp();
    const [ loadedRecipes, setLoadedRecipes ] = useState([]);
    const [ allRecipes, setAllRecipes ] = useState([]);
    const [ deletedRecipe, setDeletedRecipe ] = useState(false);
    const [ localError, setLocalError ] = useState('');
    const [ pageNumber, setPageNumber ] = useState(1);

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

    const recipeSearchHandler = ( title, tag ) => {
        let searchedRecipe;
        setLocalError('');
        
        //If title is null, we are only searching by tag
        if(title === null || ''){
            if(tag === null || ''){
                //If both are null, we have an issue and should throw an error
                setLoadedRecipes(allRecipes)
            } else {
                //If title is null but tag is not, search our tags and show results
                searchedRecipe = allRecipes.filter(x => x.recipeTags[0].toLowerCase().includes(tag.toLowerCase()));
                if(searchedRecipe.length > 0){
                    setLoadedRecipes(searchedRecipe);
                } else {
                    setLocalError('No recipes found that match your search criteria.')
                    setLoadedRecipes(allRecipes);
                }
            }
        } else {
            //Since we have a title, get recipes with the searched word in the title
            let recipesWithMatchingTitle = allRecipes.filter(x => x.recipeTitle.toLowerCase().includes(title.toLowerCase()));
            //If they are searching for a title, we need to check if they are searching by tags as well
            if(tag === null || '' ){
                //no tags? just use our filtered title vaue
                if(recipesWithMatchingTitle.length > 0){
                    setLoadedRecipes(recipesWithMatchingTitle);
                } else {
                    setLocalError('No recipes found that match your search criteria.')
                    setLoadedRecipes(allRecipes);
                }
            } else {
                //Search all the titles for our tags
                searchedRecipe = recipesWithMatchingTitle.filter(x => x.recipeTags[0].toLowerCase().includes(tag.toLowerCase()));
                if(searchedRecipe.length > 0){
                    setLoadedRecipes(searchedRecipe);
                } else {
                    setLocalError('No recipes found that match your search criteria.')
                    setLoadedRecipes(allRecipes);
                }
            }
        }
    }

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

    const numberOfPages = Math.ceil((loadedRecipes.length+1)/ITEMS_PER_PAGE)

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
                        <Col><span className='RecipePage-SubTitle'>Ready for you, right here</span></Col>
                        <Col><RecipeSearch submitRecipeSearch={(title, tag)=> recipeSearchHandler(title, tag)} /></Col>
                    </Row>
                    {/* <RecipeSearch submitRecipeSearch={(title, tag)=> recipeSearchHandler(title, tag)} /> */}
                    { loadedRecipes && recipeCardFormat }
                    { loadedRecipes && <PaginationComponent active={pageNumber} changePage={(num) => setPageNumber(num)} number={numberOfPages} /> }
                </Container>
            </div>
        )
    }

    
}

export default RecipePage;
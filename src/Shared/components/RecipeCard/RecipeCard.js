import React, { useState, useContext } from 'react';
import { useHttp } from '../../hooks/http-hook';

import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { AuthContext } from '../../context/auth-context';
import { SearchContext } from '../../context/search-context';

import AdminView from './RecipeCardView/AdminView';
import MobileView from './RecipeCardView/MobileView';

import './RecipeCard.css';

const RecipeCard = props =>{
    const { userState } = useContext(AuthContext);
    const { setSearchParam, setSearchItem } = useContext(SearchContext);

    const { sendRequest } = useHttp();

    const [ showModal, setShowModal ] = useState(false);

    let tags = props.data.recipeTags[0].split(',').map(tag=>{
        return<Link key={uuid()} className='RecipeCard-Tag' to={`/recipes/search/${tag.trim()}`} onClick={ () => { setSearchParam('tag'); setSearchItem(tag.trim()) }}>{tag}</Link>
    });

    const deleteRecipe = (id) =>{
        //Get delete oure recipe
        const deleteFromServer = async() => {
            try{
                await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/deleteOneRecipe/'+ id, 'DELETE', 'include', {Authorization: `Bearer ${userState.token}`}, null, true);
            } catch(err){
                //Errors handled in hook
            }
        }
        deleteFromServer();
        setShowModal(false);
        setTimeout(() => { props.delete(true) }, 500 );
    }

    if(props.adminPage){
        return <div className='RecipeCard-Admin' key={props.data.id}>
                    <AdminView data={props.data} foodRating={props.foodRating} userRating={props.userRating} tags={tags} deleteRecipe={deleteRecipe} userState={userState} showModal={showModal} setShowModal={setShowModal} />
                </div>
    } else {
        return <MobileView data={props.data} tags={tags} deleteRecipe={deleteRecipe} userState={userState} showModal={showModal} setShowModal={setShowModal} />
    }

}   

export default RecipeCard;
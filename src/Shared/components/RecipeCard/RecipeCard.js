import React, { useState, useContext } from 'react';
import { useHttp } from '../../hooks/http-hook';

import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { MobileContext } from '../../context/mobile-context';
import { AuthContext } from '../../context/auth-context';

import AdminView from './RecipeCardView/AdminView';
//import UserView from './RecipeCardView/UserView';
import MobileView from './RecipeCardView/MobileView';

import './RecipeCard.css';

const RecipeCard = props =>{
    const { isMobile } = useContext(MobileContext);
    const { userState } = useContext(AuthContext);
    const { sendRequest } = useHttp();

    const [ showModal, setShowModal ] = useState(false);

    let tags = props.data.recipeTags.map(tag=>{
        return<Link key={uuid()} className='RecipeCard-Tag' to={`/recipes/search/${tag}`}>{tag}</Link>
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

    //Leaving this check in here for now; May decide to make it a user option to use UserView if its not a mobile viewport size.
    if(!isMobile){
        if(props.adminPage){
            return <div className='RecipeCard-Admin' key={props.data.id}>
                        <AdminView data={props.data} foodRating={props.foodRating} userRating={props.userRating} tags={tags} deleteRecipe={deleteRecipe} userState={userState} showModal={showModal} setShowModal={setShowModal} />
                    </div>
        } else {
            // return(
            //      <div className='' key={props.data.id}>
            //          <UserView data={props.data} foodRating={props.foodRating} userRating={props.userRating} tags={tags} deleteRecipe={deleteRecipe} userState={userState} showModal={showModal} setShowModal={setShowModal}/> 
            //      </div>
            // )
            return <MobileView data={props.data} tags={tags} deleteRecipe={deleteRecipe} userState={userState} showModal={showModal} setShowModal={setShowModal}/>

        }
    } else {
        return <MobileView data={props.data} tags={tags} deleteRecipe={deleteRecipe} userState={userState} showModal={showModal} setShowModal={setShowModal}/>
    }
}

export default RecipeCard;
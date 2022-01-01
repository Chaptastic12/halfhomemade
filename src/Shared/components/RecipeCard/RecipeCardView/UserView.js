import React from 'react';

import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PopupModal from '../../UI Elements/Modal/Modal';
import Stars from '../../UI Elements/Stars/Stars';

import useProgressiveImage from '../../../hooks/lazyLoad-hook';

const UserView = props =>{

    let userRating = <Stars item={props.userRating} />
    let foodRating = <Stars item={props.foodRating} />

    const loadedRecipeImage = useProgressiveImage(process.env.REACT_APP_IMAGE_ENDPOINT + props.data.foodImage)
    const loadedBookImage = useProgressiveImage(process.env.REACT_APP_IMAGE_ENDPOINT + props.data.userImage)

    return (
        <Row>
            <Col>
                { loadedRecipeImage ? <div className='RecipeCard-FoodImage RecipeImage' style={{backgroundImage: 'URL(' + loadedRecipeImage || null + ')'}} /> : <Spinner animation="border" /> }
            </Col>
            <Col>
                <h2>{props.data.foodTitle}</h2>
                { props.foodRating === 0 ? <p>This Recipe has not been rated yet</p> : <p className='RecipeCard-Stars'>{foodRating}</p> }
                <p>{props.data.foodDesc}</p>
                <Button className='RecipeCard-Link' as={Link} to={`/recipes/view/${props.data.id}`}>View</Button>
                <p>TAGS: {props.tags}</p>
                <p className='RecipeCard-Date'>Date Posted: {props.data.date}</p>
                { props.userState.isAdmin && <span>
                    <PopupModal show={props.showModal} body='Are you sure you would like to delete this entry?' title='Confirm deletion' handleClose={() => props.setShowModal(false)}
                            directTo='Confirm delete' directToFunction={ () => props.deleteRecipe(props.data.id) } directToRoute={'/recipes/all'} />
                    <Button variant='danger' className='RecipeCard-Link' onClick={() => props.setShowModal(true)}>Delete</Button> 
                    <Button variant='warning' className='RecipeCard-Link' as={Link} to={`/recipes/edit/${props.data.id}`}>Edit</Button> 
                </span>}
            </Col>
            <Col>
                <div className='text-center'>
                    { loadedBookImage ? <div className='RecipeCard-UserImage RecipeImage' style={{backgroundImage: 'URL(' + loadedBookImage || null + ')'}} /> : <Spinner animation="border" /> }
                    <h3>{userRating}</h3>
                </div>
            </Col>
        </Row>
    )
}

export default UserView;
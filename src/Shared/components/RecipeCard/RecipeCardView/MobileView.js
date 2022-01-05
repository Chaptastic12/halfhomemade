import React from 'react';

import { Card, Col, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import PopupModal from '../../UI Elements/Modal/Modal';
import Stars from '../../UI Elements/Stars/Stars';

import useProgressiveImage from '../../../hooks/lazyLoad-hook';

const MobileView = props =>{

    const history = useHistory();
    let foodRating = <Stars item={props.data.recipeRating} />
    const loadedRecipeImage = useProgressiveImage(process.env.REACT_APP_IMAGE_ENDPOINT + props.data.recipeImage);

    const onCardClickHandler = () => {
        history.push(`/recipes/view/${props.data._id}`);
    }

    return (
        <Col sm={6} className='RecipeCard-Mobile RecipeImage d-flex align-items-center justify-content-center'>
            <Card className='RecipeCard-MobileCard' onClick={() => onCardClickHandler()}>
                <Card.Img variant="top" src={loadedRecipeImage} />
                <Card.Body>
                    <Card.Title>{props.data.recipeTitle}</Card.Title>
                    <Card.Text>
                        { props.data.recipeRating === 0 ? <small>Recipe not yet rated</small> : <span className='RecipeCard-Stars'>{foodRating}</span> } 
                        {/* <Button className='RecipeCard-Link' size='sm' variant='outline-primary' as={Link} to={`/recipes/view/${props.data.id}`}>View</Button> */}
                    </Card.Text>
                    <Card.Text>{props.data.recipeDesc}</Card.Text>
                    <Card.Text><span  className='RecipeCard-Tags'>TAGS: {props.tags}</span></Card.Text>
                    <Card.Text className='text-center'><small>Found in the <strong>{props.data.recipeBook.bookTitle}</strong> recipe book</small></Card.Text>
                    <Card.Footer>
                        <p className='RecipeCard-Date'>Date Posted: {props.data.createdAt}</p>
                    </Card.Footer>
                    { props.userState.isAdmin && <span>
                        <PopupModal 
                            show={props.showModal} 
                            body='Are you sure you would like to delete this entry?' 
                            title='Confirm deletion' 
                            handleClose={() => props.setShowModal(false)}
                            directTo='Confirm delete' 
                            directToFunction={ () => props.deleteRecipe(props.data.id) } 
                            directToRoute={'/recipes/all'} 
                        />
                        <Button variant='danger' className='RecipeCard-Link' onClick={() => props.setShowModal(true)}>Delete</Button> 
                        <Button variant='warning' className='RecipeCard-Link' as={Link} to={`/recipes/edit/${props.data.id}`}>Edit</Button> 
                    </span>}
                </Card.Body>
            </Card>  
        </Col> 
    )
}
    export default MobileView;


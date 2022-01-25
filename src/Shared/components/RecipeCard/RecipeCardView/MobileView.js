import React, { useState } from 'react';

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
    const [ opacity, setOpacity ] = useState('');

    return (
        <Col className='RecipeCard-Mobile RecipeImage d-flex align-items-center justify-content-center' >
            <div className='cust-shadow-sm'>
                <Card className='RecipeCard-MobileCard' onClick={() => onCardClickHandler()} onMouseEnter={() => setOpacity(prevState => !prevState)} onMouseLeave={() => setOpacity(prevState => !prevState)}>
                    <div className={`RecipeCard-ImgDiv ${opacity && 'opacity'}`}>
                        <Card.Img variant="top" className='RecipCard-CardImg' src={loadedRecipeImage} />
                    </div>
                    <Card.Body>
                        <Card.Title>{props.data.recipeTitle}</Card.Title>
                        <Card.Text>
                            { props.data.recipeRating === 0 ? <small>Recipe not yet rated</small> : <span className='RecipeCard-Stars'>{foodRating}({props.data.reviews.length})</span> } 
                            {/* <Button className='RecipeCard-Link' size='sm' variant='outline-primary' as={Link} to={`/recipes/view/${props.data.id}`}>View</Button> */}
                        </Card.Text>
                        {/* <Card.Text>{props.data.recipeDesc}</Card.Text> */}
                        <Card.Text><span  className='RecipeCard-Tags'>TAGS:<br /> {props.tags}</span></Card.Text>
                        <Card.Text className='text-center'><small>Found in the <strong>{props.data.recipeBook.bookTitle}</strong> recipe book</small></Card.Text>
                        <Card.Footer>
                            <p className='RecipeCard-Date'>Date Posted: {props.data.createdAt}</p>
                        </Card.Footer>
                    </Card.Body>
                </Card>  
                { props.userState.isAdmin && <span>
                    <PopupModal 
                        show={props.showModal} 
                        body='Are you sure you would like to delete this entry?' 
                        title='Confirm deletion' 
                        handleClose={() => props.setShowModal(false)}
                        directTo='Confirm delete' 
                        directToFunction={ () => props.deleteRecipe(props.data._id) } 
                        directToRoute={'/recipes/all'} 
                    />
                    <Button size='sm' variant='danger' className='RecipeCard-Link' onClick={() => props.setShowModal(true)}>Delete</Button> 
                    <Button size='sm' variant='warning' className='RecipeCard-Link' as={Link} to={`/recipes/edit/${props.data._id}`}>Edit</Button> 
                </span>}
            </div>
        </Col> 
    )
}
    export default MobileView;


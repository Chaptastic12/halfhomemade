import React from 'react';

import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PopupModal from '../../UI Elements/Modal/Modal';
import Stars from '../../UI Elements/Stars/Stars';

const MobileView = props =>{

    let foodRating = <Stars item={props.foodRating} />

    return (
        <Col sm={6} className='RecipeCard-Mobile RecipeImage d-flex align-items-center justify-content-center'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.REACT_APP_IMAGE_ENDPOINT + props.data.foodImage} />
                <Card.Body>
                    <Card.Title>{props.data.foodTitle}</Card.Title>
                    <Card.Text>{ props.foodRating === 0 ? <span>This Recipe has not been rated yet</span> : <span className='RecipeCard-Stars'>{foodRating}</span> }</Card.Text>
                    <Card.Text>{props.data.foodDesc}</Card.Text>
                    <Button className='RecipeCard-Link' as={Link} to={`/recipes/view/${props.data.id}`}>View</Button>
                    { props.userState.isAdmin && <span>
                        <PopupModal show={props.showModal} body='Are you sure you would like to delete this entry?' title='Confirm deletion' handleClose={() => props.setShowModal(false)}
                                    directTo='Confirm delete' directToFunction={ () => props.deleteRecipe(props.data.id) } directToRoute={'/recipes/all'} />
                        <Button variant='danger' className='RecipeCard-Link' onClick={() => props.setShowModal(true)}>Delete</Button> 
                        <Button variant='warning' className='RecipeCard-Link' as={Link} to={`/recipes/edit/${props.data.id}`}>Edit</Button> 
                    </span>}
                    <Card.Text><span  className='RecipeCard-Tags'>TAGS: {props.tags}</span></Card.Text>
                    <Card.Footer>
                        <p className='RecipeCard-Date'>Date Posted: {props.data.date}</p>
                    </Card.Footer>
                </Card.Body>
            </Card>  
        </Col> 
    )
}
    export default MobileView;


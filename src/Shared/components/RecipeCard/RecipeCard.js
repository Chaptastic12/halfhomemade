import React, { useState, useContext } from 'react';
import { useHttp } from '../../hooks/http-hook';

import { Link } from 'react-router-dom';
import { Col, Row, Button, Container, Card } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { MobileContext } from '../../context/mobile-context';
import { AuthContext } from '../../context/auth-context';

import PopupModal from '../UI Elements/Modal/Modal';
import Stars from '../UI Elements/Stars/Stars';

import './RecipeCard.css';

const RecipeCard = props =>{
    const { isMobile } = useContext(MobileContext);
    const { userState } = useContext(AuthContext);

    const { sendRequest } = useHttp();

    const [ showModal, setShowModal ] = useState(false);
  
    let userRating = <Stars item={props.userRating} />
    let foodRating = <Stars item={props.foodRating} />

    let tags = props.tags.map(tag=>{
        return<Link key={uuid()} className='RecipeCard-Tag' to={`/recipes/search?=${tag}`}>{tag}</Link>
    });

    const deleteRecipe = () =>{
        //Get delete oure recipe
        const deleteFromServer = async() => {
            try{
                await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/deleteOneRecipe/'+props.id, 'DELETE', 'include', {Authorization: `Bearer ${userState.token}`}, null, true);
            } catch(err){
                //Errors handled in hook
            }
        }
        deleteFromServer();
        setShowModal(false);
        setTimeout(() => {props.delete(true) }, 500 );
    }

    if(!isMobile){
        return(
            <Container className='RecipeCard' key={props.id}>
                <Row>
                    <Col>
                        <div className='RecipeCard-FoodImage' style={{backgroundImage: 'URL(' + process.env.REACT_APP_IMAGE_ENDPOINT + props.foodImage+')'}} />
                    </Col>
                    <Col>
                        <h2>{props.foodTitle}</h2>
                        { props.foodRating === 0 ? <p>This Recipe has not been rated yet</p> : <p className='RecipeCard-Stars'>{foodRating}</p> }
                        <p>{props.foodDesc}</p>
                        <Button className='RecipeCard-Link' as={Link} to={`/recipes/view/${props.id}`}>View</Button>
                        <p>TAGS: {tags}</p>
                        <p className='RecipeCard-Date'>Date Posted: {props.date}</p>
                        { userState.isAdmin && <span>
                            <PopupModal show={showModal} body='Are you sure you would like to delete this entry?' title='Confirm deletion' handleClose={() => setShowModal(false)}
                                    directTo='Confirm delete' directToFunction={ () => deleteRecipe() } directToRoute={'/recipes/all'} />
                            <Button variant='danger' className='RecipeCard-Link' onClick={() => setShowModal(true)}>Delete</Button> 
                            <Button variant='warning' className='RecipeCard-Link' as={Link} to={`/recipes/edit/${props.id}`}>Edit</Button> 
                        </span>}
                    </Col>
                    <Col>
                        <div className='text-center'>
                            <div className='RecipeCard-UserImage' style={{backgroundImage: 'URL('+props.userImage+')'}} />
                            <h3>{userRating}</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
    return(
        <Col sm={6} className='RecipeCard-Mobile d-flex align-items-center justify-content-center'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`http://localhost:8081/${props.foodImage}`} />
                <Card.Body>
                    <Card.Title>{props.foodTitle}</Card.Title>
                    <Card.Text>{ props.foodRating === 0 ? <span>This Recipe has not been rated yet</span> : <span className='RecipeCard-Stars'>{foodRating}</span> }</Card.Text>
                    <Card.Text>{props.foodDesc}</Card.Text>
                    <Button className='RecipeCard-Link' as={Link} to={`/recipes/view/${props.id}`}>View</Button>
                    { userState.isAdmin && <span>
                        <PopupModal show={showModal} body='Are you sure you would like to delete this entry?' title='Confirm deletion' handleClose={() => setShowModal(false)}
                                    directTo='Confirm delete' directToFunction={ () => deleteRecipe() } directToRoute={'/recipes/all'} />
                        <Button variant='danger' className='RecipeCard-Link' onClick={() => setShowModal(true)}>Delete</Button> 
                        <Button variant='warning' className='RecipeCard-Link' as={Link} to={`/recipes/edit/${props.id}`}>Edit</Button> 
                    </span>}
                    <Card.Text><span  className='RecipeCard-Tags'>TAGS: {tags}</span></Card.Text>
                    <Card.Footer>
                        <p className='RecipeCard-Date'>Date Posted: {props.date}</p>
                    </Card.Footer>
                </Card.Body>
            </Card>  
        </Col> 
    )     
}

export default RecipeCard;
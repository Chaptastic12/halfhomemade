import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';

import { MobileContext } from '../../context/mobile-context';
import { AuthContext } from '../../context/auth-context';

import Stars from '../UI Elements/Stars/Stars';

import './RecipeCard.css';

const RecipeCard = props =>{
    const { isMobile } = useContext(MobileContext);
    const { userState } = useContext(AuthContext);
  
    let userRating = <Stars item={props.userRating} />
    let foodRating = <Stars item={props.foodRating} />

    let tags = props.tags.map(tag=>{
        return<Link className='RecipeCard-Tag' to={`/recipes/search?=${tag}`}>{tag}</Link>
    });

    if(!isMobile){
        return(
            <Container className='RecipeCard'>
                <Row>
                    <Col>
                        <div className='RecipeCard-FoodImage' style={{backgroundImage: 'URL(http://localhost:8081/'+props.foodImage+')'}} />
                    </Col>
                    <Col>
                        <h2>{props.foodTitle}</h2>
                        { props.foodRating === 0 ? <p>This Recipe has not been rated yet</p> : <p className='RecipeCard-Stars'>{foodRating}</p> }
                        <p>{props.foodDesc}</p>
                        <Button className='RecipeCard-Link' as={Link} to={`/recipes/view/${props.id}`}>View</Button>
                        <p>TAGS: {tags}</p>
                        <p className='RecipeCard-Date'>Date Posted: {props.date}</p>
                        { userState.isAdmin && <span>
                            <Button variant='danger' className='RecipeCard-Link' as={Link} to={`/recipes/delete/${props.id}`}>Delete</Button> 
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
                    <Card.Text>{ props.foodRating === 0 ? <p>This Recipe has not been rated yet</p> : <p className='RecipeCard-Stars'>{foodRating}</p> }</Card.Text>
                    <Card.Text>{props.foodDesc}</Card.Text>
                    <Button className='RecipeCard-Link' as={Link} to={`/recipes/view/${props.id}`}>View</Button>
                    { userState.isAdmin && <span>
                        <Button variant='danger' className='RecipeCard-Link' as={Link} to={`/recipes/delete/${props.id}`}>Delete</Button> 
                        <Button variant='warning' className='RecipeCard-Link' as={Link} to={`/recipes/edit/${props.id}`}>Edit</Button> 
                    </span>}
                    <Card.Text><p  className='RecipeCard-Tags'>TAGS: {tags}</p></Card.Text>
                    <Card.Footer>
                        <p className='RecipeCard-Date'>Date Posted: {props.date}</p>
                    </Card.Footer>
                </Card.Body>
            </Card>  
        </Col> 
    )     
}

export default RecipeCard;
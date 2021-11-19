import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';

import { MobileContext } from '../../context/mobile-context';

import Stars from '../UI Elements/Stars/Stars';

import './RecipeCard.css';

const RecipeCard = props =>{
    const { isMobile } = useContext(MobileContext);
  
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
                        <div className='RecipeCard-FoodImage' style={{backgroundImage: 'URL('+props.foodImage+')'}} />
                    </Col>
                    <Col>
                        <h2>{props.foodTitle}</h2>
                        <p className='RecipeCard-Stars'>{foodRating}</p>
                        <p>{props.foodDesc}</p>
                        <Button className='RecipeCard-Link'><Link to={`/recipes/view/${props.id}`}>View</Link></Button>
                        <p>TAGS: {tags}</p>
                        <p className='RecipeCard-Date'>Date Posted: {props.date}</p>
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
        <Col sm={6} className='d-flex align-items-center justify-content-center'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.foodImage} />
                <Card.Body>
                    <Card.Title>{props.foodTitle}</Card.Title>
                    <Card.Text>{foodRating}</Card.Text>
                    <Card.Text>{props.foodDesc}</Card.Text>
                    <Button className='RecipeCard-Link'><Link to={`/recipes/view/${props.id}`}>View</Link></Button>
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
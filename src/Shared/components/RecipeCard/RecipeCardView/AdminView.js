import React from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminView = props => {

    return (
        <Row>
            <Col>
                <div className='RecipeCard-FoodImage-Admin RecipeImage' style={{backgroundImage: 'URL(' + process.env.REACT_APP_IMAGE_ENDPOINT + props.data.foodImage + ')'}} />
            </Col>
            <Col>
                <span>
                    <b>{props.data.foodTitle} </b>
                    { props.data.foodRating === 0 ? <span>[ Not yet rated ]</span> : <span className='RecipeCard-Stars'>{props.foodRating}</span> }
                </span>
                <p>{props.data.foodDesc}</p>
                <p>Tags: {props.tags}</p>
                <p className='RecipeCard-Date'>Date Posted: {props.data.date}</p>
            </Col>
            <Col xs={3}>
                <div className='RecipeCard-UserImage-Admin RecipeImage' style={{backgroundImage: 'URL(' + process.env.REACT_APP_IMAGE_ENDPOINT + props.data.userImage + ')'}} />
            </Col>
            <Col xs={1} className='m-4'>
                <Row>
                    <Button size='sm' as={Link} to={`/recipes/view/${props.data.id}`}>View</Button>
                </Row>
                <Row>
                    <Button size='sm' variant='danger'>Delete</Button>
                </Row>
                <Row>
                    <Button size='sm' variant='warning' as={Link} to={`/recipes/edit/${props.data.id}`}>Edit</Button>
                </Row>
            </Col>
        </Row>
    )
}

export default AdminView;
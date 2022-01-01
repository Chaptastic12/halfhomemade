import React from 'react';

import { Link } from 'react-router-dom';
import { Card, Button, Col } from 'react-bootstrap';

import './ProductCard.css';

const ProductCard = props => {

    return (
        <Col className='ProductCard' key={props.id}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                    <Button variant="primary" as={Link} to={`/shop/product/${props.id}`}>View</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
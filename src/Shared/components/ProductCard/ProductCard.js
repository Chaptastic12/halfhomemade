import React from 'react';

import { useHistory } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { v4 as uuid } from 'uuid'

import Stars from '../UI Elements/Stars/Stars'

import './ProductCard.css';

const ProductCard = props => {

    const history = useHistory();

    const onCardClickHandler = () => {
        history.push(`/shop/product/${props.product.id}`);
    }

    let productRating = <Stars item={5} />

    let optionsToShow = props.product.options.map(option => {
        return <span key={uuid()}>{ option.name + ' '} </span>
    })

    return (
        <Col className='ProductCard' key={props.product.id} onClick={() => onCardClickHandler()}>
            <Card className='ProductCard-MobileCard'>
                <Card.Img variant="top" src={props.product.images[0].src} />
                <Card.Body>
                    <Card.Title>{props.product.title}</Card.Title>
                    { productRating } <br />
                    <Card.Footer>
                        <p style={{fontSize: '12px', margin: '0px'}}>Options: { optionsToShow }</p>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
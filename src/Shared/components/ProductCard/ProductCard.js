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

    const price = props.product.variants[0].price;
    const comparePrice = props.product.variants[0].compareAtPrice
    
    let showPrice, sale;
    if(price === comparePrice || comparePrice === null){
        showPrice = <> ${ price } </>
    } else {
        sale = true;
        showPrice = <><strike style={{color: 'grey', marginRight: '10px'}}> ${ price } </strike> ${ comparePrice } </>
    }

    return (
        <Col className='ProductCard' key={props.product.id} onClick={() => onCardClickHandler()}>
            <Card className='ProductCard-MobileCard cust-shadow-sm'>
                <Card.Img variant="top" src={props.product.images[0].src} />
                <Card.Body>
                    <Card.Title>{props.product.title} { sale && <div className='sale'>Sale</div> }</Card.Title>
                    { productRating } <br />
                    <div className='ProductCard-Price'> { showPrice } </div>
                    <Card.Footer>
                        <p style={{fontSize: '12px', margin: '0px'}}>Options: { optionsToShow }</p>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
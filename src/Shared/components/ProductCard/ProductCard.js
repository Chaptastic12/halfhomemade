import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { v4 as uuid } from 'uuid'

import Stars from '../UI Elements/Stars/Stars'

import './ProductCard.css';

const ProductCard = props => {

    const history = useHistory();
    const [ opacity, setOpacity ] = useState('');

    const onCardClickHandler = () => {
        history.push(`/shop/product/${props.product.id}`);
    }

    let optionsToShow = props.product.options.map(option => {
        return <span key={uuid()}>{ option.name + ' '} </span>
    })

    const price = props.product.variants[0].price;
    const comparePrice = props.product.variants[0].compareAtPrice;
    
    let showPrice, sale;
    if(price === comparePrice || comparePrice === null){
        showPrice = <> ${ price } </>
    } else {
        sale = true;
        showPrice = <><strike style={{color: 'grey', marginRight: '10px'}}> ${ price } </strike> ${ comparePrice } </>
    }

    console.log(props.rating)
    return (
        <Col xs='auto' md={4} lg={3} className='ProductCard' key={props.product.id} onClick={() => onCardClickHandler()}>
            <Card className='Card cust-shadow-sm' onMouseEnter={() => setOpacity(prevState => !prevState)} onMouseLeave={() => setOpacity(prevState => !prevState)}>
                <div className={`ImgDiv ${opacity && 'opacity'}`}>
                    <Card.Img variant="top" src={props.product.images[0].src} />
                </div>
                <Card.Body>
                    <Card.Title>{props.product.title} </Card.Title>
                    {props.rating !== 0 ? <Stars item={props.rating} /> : <span>Not yet reviewed</span> } <br />
                    <div className='Price'> { showPrice } { sale && <div className='sale'>Sale</div> }</div>
                    <Card.Footer>
                        <p style={{fontSize: '12px', margin: '0px'}}>Options: { optionsToShow }</p>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
import React from 'react';

import { Row, Col, Button } from 'react-bootstrap';

import './CartItem.css';

const CartItem = props => {

    const { item } = props;

    return <div className='CartItem'>
        <Row key={item.id}>
            <Col>
                <div className='Image' style={{ backgroundImage: 'URL('+ item.variant.image.src + ')'}} />
            </Col>
            <Col>
                <Row><span className='bold text-center'>{item.variant.title}</span></Row>
                <Row><span className='text-center'>Quantity: {item.quantity}</span></Row>
                <Row><span className='text-center'>Price: ${item.variant.price} each</span></Row>
                <Row><Button variant='danger' size='sm' onClick={() => props.removeLineItem(item.id)}>Remove</Button></Row>
            </Col>
        </Row>
    </div>
}

export default CartItem;
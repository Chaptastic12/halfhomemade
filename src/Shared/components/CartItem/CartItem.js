import React from 'react';

import { Row, Col, Button } from 'react-bootstrap';

import './CartItem.css';

const CartItem = props => {

    const { item } = props;

    return <div className='CartItem'>
        <Row key={item.id}>
            <Col>
                <div className='CartItem-Image' style={{ backgroundImage: 'URL('+ item.variant.image.src + ')'}} />
            </Col>
            <Col>
                <Row><h3 className='text-center'>{item.variant.title}</h3></Row>
                <Row><span className='text-center'>Quantity: {item.quantity}</span></Row>
                <Row><br/></Row>
                <Row><Button variant='danger' size='sm' onClick={() => props.removeLineItem(item.id)}>Remove</Button></Row>
            </Col>
        </Row>
    </div>
}

export default CartItem;
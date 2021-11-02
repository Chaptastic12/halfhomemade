import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './NavBar.css';

const MidNav = props =>{

    return(
        <Row className='MidNav d-flex align-items-center justify-content-center text-center'>
            <Col>Some other text can go here</Col>
            <Col>
                <div className='MidNav-Title'>halfHomemade</div>
            </Col>
            <Col>
                <Button variant='outline-light' className='NavBar-Button'>Login <i className="fas fa-sign-in-alt"/></Button>
                <Button variant='outline-light' className='NavBar-Button'>Cart <i className="fas fa-shopping-cart"/></Button>
            </Col>
        </Row>
        )
}

export default MidNav;
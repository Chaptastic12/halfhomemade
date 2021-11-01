import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Footer.css';

const Footer = props =>{

    return(
        <div className='Footer d-flex justify-content-center'>
            <Row sm='auto'>
                <Col>
                    <h1 className='Footer-Recipes'>RECIPES & SHOP</h1>
                    <ul>
                        <li>Buy the book</li>
                        <li>View all recipes</li>
                        <li>View American recipes</li>
                        <li>View Asian recipes</li>
                    </ul>
                </Col>
                <Col>
                    <h1 className='Footer-About'>ABOUT US</h1>
                </Col>
                <Col>
                    <h1 className='Footer-Contact'>CONTACT</h1>
                </Col>
            </Row>
        </div>
    )
}

export default Footer;
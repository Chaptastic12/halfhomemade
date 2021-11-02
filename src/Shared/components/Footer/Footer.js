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
                        <li>Buy the Book</li>
                        <li>View all Recipes</li>
                        <li>View American Recipes</li>
                        <li>View Asian Recipes</li>
                    </ul>
                </Col>
                <Col>
                    <h1 className='Footer-About'>ABOUT</h1>
                    <ul>
                        <li>About Us</li>
                        <li>Our Methodology</li>
                        <li>Our Promise</li>
                    </ul>
                </Col>
                <Col />
                <Col>
                    <h1 className='Footer-Contact'>CONTACT</h1>
                    <ul>
                        <li>US: 1-555-5555 ][ International 1-555-5556</li>
                        <li>Monday through Friday: 9am - 5pm CST</li>
                        <li><i className="fab fa-facebook-f"/><i className="fab fa-twitter"/><i className="fab fa-instagram"/><i className="fab fa-youtube"/></li>
                        <li></li>
                        <li>
                            <p className='text-center'><i className="far fa-copyright" />Copyright ZaStrap<br/>Reserved | Privacy Policy | Legal</p>
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
    )
}

export default Footer;
import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Footer.css';

const Footer = props =>{

    return(
        <>
        <div className='Section-Divider' />

        <div className='Footer d-flex justify-content-center'>
            <Row sm='auto'>
                <Col>
                    <h1 className='Footer-Header'>RECIPES & SHOP</h1>
                    <ul>
                        <li>Buy the Book</li>
                        <li>View all Recipes</li>
                        <li>View American Recipes</li>
                        <li>View Asian Recipes</li>
                    </ul>
                </Col>
                <Col>
                    <h1 className='Footer-Header'>ABOUT</h1>
                    <ul>
                        <li>About Us</li>
                        <li>Our Methodology</li>
                        <li>Our Promise</li>
                    </ul>
                </Col>
                <Col>
                    <h1 className='Footer-Header'>CONTACT</h1>
                    <ul>
                        <li>US: 1-555-5555</li>
                        <li>International: 1-555-5556</li>
                        <li>Monday - Friday: 9am - 5pm CST</li>
                        <li><i className="fab fa-facebook-f contactIcon"/><i className="fab fa-twitter contactIcon"/><i className="fab fa-instagram contactIcon"/><i className="fab fa-youtube contactIcon"/></li>
                        <li></li>
                        <li>
                            <p className='text-center'><i className="far fa-copyright"/> Copyright ZaStrap<br/>Reserved | Privacy Policy | Legal</p>
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default Footer;
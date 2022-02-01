import React from 'react';

import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import './Footer.css';

const Footer = props =>{

    return(
        <>
            <div className='Section-Divider' />

            <div className='Footer'>
                <Row sm='auto'>
                    <Col>
                        <h1 className='Header'>RECIPES & SHOP</h1>
                        <ul>
                            <li>Buy the Book</li>
                            <li><Link to='/recipes/all'>View all Recipes</Link></li>
                            <li>View American Recipes</li>
                            <li>View Asian Recipes</li>
                        </ul>
                    </Col>
                    <Col>
                        <h1 className='Header'>ABOUT</h1>
                        <ul>
                            <li>About Us</li>
                            <li>Our Methodology</li>
                            <li>Our Promise</li>
                        </ul>
                    </Col>
                    <Col>
                        <h1 className='Header'>CONTACT</h1>
                        <ul>
                            <li>US: 1-555-5555</li>
                            <li>Int'l: 1-555-5556</li>
                            <li>Monday - Friday: <br /> 9am - 5pm CST</li>
                            <li></li>
                            <li><i className="fab fa-facebook-f contactIcon"/><i className="fab fa-twitter contactIcon"/><i className="fab fa-instagram contactIcon"/><i className="fab fa-youtube contactIcon"/></li>
                            <li></li>
                            <li>
                                <p className='text-center copyright'><i className="far fa-copyright"/>Copyright ZaStrap<br/>Reserved | Privacy Policy | Legal</p>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Footer;
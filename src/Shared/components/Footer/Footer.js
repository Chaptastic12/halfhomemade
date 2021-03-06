import React from 'react';

import { NavHashLink } from 'react-router-hash-link';

import DropDownItemHelper from '../../utils/DropDownItemHelper';
import { Col, Row } from 'react-bootstrap';

import './Footer.css';

const Footer = props =>{

    const recipeNavOptions = [
        { to: '/recipes/search/all', clickParam: null, clickItem: null, desc: 'All Recipes'},
        { to: '/recipes/search/stars', clickParam: 'stars', clickItem: 5, desc: 'Best Reviewed Recipes'},
        { to: '/recipes/search/japanese', clickParam: 'tag', clickItem:'japanese', desc: 'Japanese Recipes'},
        { to: '/recipes/search/american', clickParam: 'tag', clickItem:'american', desc: 'American Recipes'}
    ];

    const ShopNavOptions = [
        { to: '/shop/search/all', clickParam: null, clickItem: null, desc: 'View All Products'},
        { to: '/shop/search/shirts', clickParam: 'text', clickItem: 'shirt', desc: 'View Shirts'}
    ]

    return(
        <div className='Footer'>
            <Row sm='auto'>
                <Col>
                    <h1 className='Header'>RECIPES & SHOP</h1>
                    <ul>
                        <DropDownItemHelper footer={true} data={recipeNavOptions} searchLink={true} />
                        <DropDownItemHelper footer={true} data={ShopNavOptions} searchLink={true} />
                    </ul>
                </Col>
                <Col>
                    <h1 className='Header'>ABOUT</h1>
                    <ul>
                    <li><NavHashLink to='/about/#about'>About Us</NavHashLink></li>
                        <li><NavHashLink to='/about/#methodology'>Our Methodology</NavHashLink></li>
                        <li><NavHashLink to='/about/#promise'>Our Promise</NavHashLink></li>
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
    )
}

export default Footer;
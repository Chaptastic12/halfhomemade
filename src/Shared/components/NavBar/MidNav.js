import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { SideDrawerContext } from '../../context/sidedrawer-context';

import './NavBar.css';

const MidNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);

    return(
        <Row className='MidNav d-flex align-items-center justify-content-center text-center'>
            <Col>Some other text can go here</Col>
            <Col>
                <div className='MidNav-Title'><NavLink to='/'>halfHomemade</NavLink></div>
            </Col>
            <Col>
                <Button variant='outline-light' className='NavBar-Button'><NavLink to="/login">Login</NavLink> <i className="fas fa-sign-in-alt"/></Button>
                <Button variant='outline-light' className='NavBar-Button' onClick={()=>handleCartShow()}>Cart <i className="fas fa-shopping-cart"/></Button>
            </Col>
        </Row>
        )
}

export default MidNav;
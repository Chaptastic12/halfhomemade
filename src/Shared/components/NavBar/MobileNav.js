import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import BottomNav from './BottomNav';

import './NavBar.css';

const MobileNav = props =>{

    const [ showBottomNav, setShowBottomNav ] = useState(false);

    const toggleDrawer = () =>{
        setShowBottomNav(!showBottomNav);
    }
    
    return (
            <>
                <Row className='MobileNav d-flex align-items-center justify-content-center'>
                    <Col><i className="Nav-Hamburger fas fa-bars" onClick={()=>toggleDrawer()}/><span className='MobileNav-Title'><NavLink to='/'>halfHomemade</NavLink></span></Col>
                </Row>
                <Row className='d-flex align-items-center justify-content-center'>
                    {showBottomNav && <BottomNav mobile /> }
                </Row>
            </>
            );
}

export default MobileNav;
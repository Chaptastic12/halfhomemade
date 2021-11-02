import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
                    <Col><i className="Nav-Hamburger fas fa-bars" onClick={()=>toggleDrawer()}/><span className='MobileNav-Title'>halfHomemade</span></Col>
                </Row>
                <Row className='d-flex align-items-center justify-content-center'>
                    {showBottomNav && <BottomNav mobile /> }
                </Row>
            </>
            );
}

export default MobileNav;
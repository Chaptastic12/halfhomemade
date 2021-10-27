import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './NavBar.css';

const MidNav = props =>{

    return(
        <div className='MidNav-Title'>
            <Container>
                <div className='text-center'>Half-Homemade</div>
            </Container>
        </div>)
}

export default MidNav;
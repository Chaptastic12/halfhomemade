import React from 'react';

import { Button, Offcanvas } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';


const SideCart = props =>{

 
    return (
        <Offcanvas show={props.showNav} placement='start' className='me-2'>
            <Offcanvas.Header closeButton onClick={props.closeNav}>
                <Offcanvas.Title>Nav</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                This is the nav
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default SideCart;
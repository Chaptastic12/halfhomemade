import React from 'react';

import { Offcanvas } from 'react-bootstrap';
// import { v4 as uuid } from 'uuid';


const SideCart = props =>{

 
    return (<>
        { props.showNav && <div style={{width: 'calc((100vw - 400px))', height: '100vh', top: 0, left: '400px', position: 'fixed', zIndex: 1050}} onClick={props.closeNav} /> }
        <Offcanvas show={props.showNav} placement='start' className='me-2'>
            <Offcanvas.Header closeButton onClick={props.closeNav}>
                <Offcanvas.Title>Nav</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                This is the nav
            </Offcanvas.Body>
        </Offcanvas>
    </>);
}

export default SideCart;
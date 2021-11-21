import React, { useContext } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';

import { SideDrawerContext } from '../../../context/sidedrawer-context';

const SideCart = props =>{

    const { showCart, handleCartClose } = useContext(SideDrawerContext);

    return (
        <Offcanvas show={showCart} placement='end' className='me-2'>
            <Offcanvas.Header closeButton onClick={handleCartClose}>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                List of items will go here
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default SideCart;
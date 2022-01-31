import React, { useContext } from 'react';

import { Button, Offcanvas } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import CartItem from '../../CartItem/CartItem';

import { SideDrawerContext } from '../../../context/sidedrawer-context';
import { ShopContext } from '../../../context/shop-context';

import './SideCart.css';

const SideCart = props =>{

    const { showCart, handleCartClose } = useContext(SideDrawerContext);
    const { checkout, removeItemsFromCheckout, clearCart } = useContext(ShopContext);

    let cartItems;
    if(checkout.lineItems){
        cartItems = checkout.lineItems.map(item => {
            return <CartItem key={uuid()} item={item} removeLineItem={removeItemsFromCheckout}/>
        });
    } 

    const removeAllFromCart = e => {
        e.preventDefault();
        let cartIds = [];
        for(let i=0; i < checkout.lineItems.length; i++){
            cartIds.push(checkout.lineItems[i].id)
        }
        clearCart(cartIds);
    }

    return (<>
        { showCart && <div style={{width: 'calc((100vw - 400px))', height: '100vh', top: 0, left: 0, position: 'fixed', zIndex: 1050}} onClick={handleCartClose} /> }
            <Offcanvas show={showCart} placement='end' className='me-2'>
                <Offcanvas.Header closeButton onClick={handleCartClose}>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {( checkout.lineItems && checkout.lineItems.length > 0 ) ? 
                    <>
                        { cartItems } 
                        <span className='Cart-Totals'>
                            <h1>Total: ${checkout.totalPrice}</h1>
                            <p>Tax Calculated at checkout</p>
                            <Button size='lg' target="_blank" rel="noreferrer" href={checkout.webUrl} disabled>Checkout</Button>
                            <Button size='lg' onClick={(e) => removeAllFromCart(e)} style={{marginLeft: '15px'}}>Clear Cart</Button>
                        </span>
                    </>
                    : 'No items currently in cart' }
                </Offcanvas.Body>
            </Offcanvas>
    </>);
}

export default SideCart;
import React from 'react';

import { NavLink } from 'react-router-dom';
import { Row, Col, Button, DropdownButton } from 'react-bootstrap';

import DropDownItemHelper from '../../utils/DropDownItemHelper';
import NavCanvasItem from '../../components/UI Elements/NavCanvasItem/NavCanvasItem';

const BottomNav = props =>{

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

    const bookNavOptions = [
        { to: '/books/search/all', clickParam: null, clickItem: null, desc: 'View All Books'}
    ]

    if(props.mobile){
        return (
            // <Accordion flush>
            //     <Accordion.Item eventKey='0'>
            //         <Accordion.Header>Recipes</Accordion.Header>
            //         <Accordion.Body onClick={() => props.setShowMobileNav(false)}>                    
            //             <NavCanvasItem data={recipeNavOptions} searchLink={true} /> 
            //         </Accordion.Body>
            //     </Accordion.Item>
            //     <Accordion.Item eventKey='1'>
            //        <Accordion.Header>Shop</Accordion.Header>
            //        <Accordion.Body onClick={() => props.setShowMobileNav(false)}>                    
            //             <NavCanvasItem data={ShopNavOptions} searchLink={true} /> 
            //             <NavCanvasItem data={props.collections} collections={true} /> 
            //        </Accordion.Body>
            //     </Accordion.Item>
            //     <Accordion.Item eventKey='2'>
            //        <Accordion.Header>Books</Accordion.Header>
            //        <Accordion.Body onClick={() => props.setShowMobileNav(false)}>                    
            //             <NavCanvasItem data={bookNavOptions} searchLink={true} /> 
            //             {props.books && <NavCanvasItem data={props.books.filter(x => x._id !== '620150200bec367cd2bdcb39')} books={true} /> }
            //        </Accordion.Body>
            //     </Accordion.Item>
            //     <Accordion.Item eventKey='3'>
            //        <Accordion.Header>About</Accordion.Header>
            //        <Accordion.Body onClick={() => props.setShowMobileNav(false)}>                    
            //             <NavCanvasItem data={[{to: '/about', desc: 'About'}]} normalLink={true} /> 
            //        </Accordion.Body>
            //     </Accordion.Item>
            // </Accordion>
            <div onClick={() => props.setShowMobileNav(false)}>
                <div> 
                    <h3>Recipes</h3>
                   <NavCanvasItem data={recipeNavOptions} searchLink={true} /> 
                </div>
                <div> 
                    <h3>Shop</h3>
                    <NavCanvasItem data={ShopNavOptions} searchLink={true} /> 
                    <NavCanvasItem data={props.collections} collections={true} />
                </div>
                <div> 
                    <h3>Books</h3>
                    <NavCanvasItem data={bookNavOptions} searchLink={true} /> 
                    {props.books && <NavCanvasItem data={props.books.filter(x => x._id !== '620150200bec367cd2bdcb39')} books={true} /> }
                </div>
                <div> 
                    <h3>About</h3>
                    <NavCanvasItem data={[{to: '/about', desc: 'About'}]} normalLink={true} /> 
                </div>

            </div>
        )
    }
   
    return (
            <Row className='text-center justify-content-center'>
                <div className='NavBottom'>
                    <Col xs='auto'>
                        <DropdownButton title={`Recipes`} variant='outline-none' className='NavBar-Button'>
                            <DropDownItemHelper data={recipeNavOptions} searchLink={true} />
                        </DropdownButton>
                    </Col>
                    <Col xs='auto'>
                        <DropdownButton title={`Books`} variant='outline-none' className='NavBar-Button'>
                            <DropDownItemHelper data={bookNavOptions} searchLink={true} />
                            {props.books && <DropDownItemHelper data={props.books.filter(x => x._id !== '620150200bec367cd2bdcb39')} books={true} /> }
                        </DropdownButton> 
                    </Col>
                    <Col xs='auto'>
                        <DropdownButton title={`Shop`} variant='outline-none' className='NavBar-Button'>
                            <DropDownItemHelper data={ShopNavOptions} searchLink={true} />
                            <DropDownItemHelper data={props.collections} collections={true} />
                        </DropdownButton> 
                    </Col>
                    <Col xs='auto'>
                        <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/about">About</Button>
                    </Col>
                </div>
            </Row>
    )
    
}

export default BottomNav;
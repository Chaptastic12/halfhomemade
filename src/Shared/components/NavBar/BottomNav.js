import React from 'react';

import { NavLink } from 'react-router-dom';
import { Row, Col, Button, DropdownButton } from 'react-bootstrap';

import DropDownItemHelper from '../../utils/DropDownItemHelper';

const BottomNav = props =>{

    const recipeNavOptions = [
        { to: '/recipes/search/all', clickParam: null, clickItem: null, desc: 'All'},
        { to: '/recipes/search/stars', clickParam: 'stars', clickItem: 5, desc: 'Best Reviewed'},
        { to: '/recipes/search/japanese', clickParam: 'tag', clickItem:'japanese', desc: 'Japanese Dishes'},
        { to: '/recipes/search/american', clickParam: 'tag', clickItem:'american', desc: 'American Dishes'}
    ];

    const ShopNavOptions = [
        { to: '/shop/search/all', clickParam: null, clickItem: null, desc: 'View All'},
        { to: '/shop/search/shirts', clickParam: 'text', clickItem: 'shirt', desc: 'View Shirts'}
    ]
    
    return (
            <Row className='text-center justify-content-center'>
                <div className='NavBottom'>
                    <Col xs='auto'>
                        <DropdownButton title={`Recipes`} variant='outline-none' className='NavBar-Button'>
                            <DropDownItemHelper data={recipeNavOptions} searchLink={true} />
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
                    <Col xs='auto'>
                        <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/blog/all">Blog</Button>
                    </Col>
                </div>
            </Row>
    )
    
}

export default BottomNav;
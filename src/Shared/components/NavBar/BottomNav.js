import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import { SideDrawerContext } from '../../context/sidedrawer-context';

const BottomNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);

    if(!props.mobile){
        return(
            <div className='BotNav-Nav d-flex justify-content-center'>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/recipes/all">
                    Recipes
                </Button>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/shop">
                    Shop
                </Button>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/about">
                    About
                </Button>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/blog/all">
                    Blog
                </Button>
            </div>
        );
    }

    return(
        <div className='MobileBotNav-Nav d-flex justify-content-center'>
            <Button size='sm' className='NavBar-Button' variant='outline-dark' as={NavLink} to="/recipes/all">
                    Recipes
                </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark' as={NavLink} to="/shop">
                    Shop
                </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark' as={NavLink} to="/about">
                    About
                </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark' as={NavLink} to="/blog/all">
                    Blog
                </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>
                <NavLink to="/login">Login <i className="fas fa-sign-in-alt"/></NavLink>
            </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark' onClick={()=>handleCartShow()}>
                Cart <i className="fas fa-shopping-cart"/>
            </Button>
        </div> 
    )
}

export default BottomNav;
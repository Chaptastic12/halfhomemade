import React from 'react';
import { NavLink } from 'react-router-dom'

import Button from 'react-bootstrap/Button';

const BottomNav = props =>{

    if(!props.mobile){
        return(
            <div className='BotNav-Nav d-flex justify-content-center'>
                <Button className='NavBar-Button' variant='outline-light'>
                    <NavLink to="/recipes/all">Recipes</NavLink>
                </Button>
                <Button className='NavBar-Button' variant='outline-light'>Shop</Button>
                <Button className='NavBar-Button' variant='outline-light'>About</Button>
                <Button className='NavBar-Button' variant='outline-light'>Blog</Button>
            </div>
        );
    }

    return(
        <div className='MobileBotNav-Nav d-flex justify-content-center'>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>
                <NavLink to="/recipes/all">Recipes</NavLink>
            </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>Shop</Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>About</Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>Blog</Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>
                <NavLink to="/login">Login <i className="fas fa-sign-in-alt"/></NavLink>
            </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>Cart <i className="fas fa-shopping-cart"/></Button>
        </div>
    )
}

export default BottomNav;
import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import { SideDrawerContext } from '../../context/sidedrawer-context';

const BottomNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);

    if(!props.mobile){
        return(
            <div className='BotNav-Nav d-flex justify-content-center'>
                <Button className='NavBar-Button' variant='outline-light'>
                    <NavLink to="/recipes/all">Recipes</NavLink>
                </Button>
                <Button className='NavBar-Button' variant='outline-light'>
                    <NavLink to="/shop">Shop</NavLink>
                </Button>
                <Button className='NavBar-Button' variant='outline-light'>
                    <NavLink to="/about">About</NavLink>
                </Button>
                <Button className='NavBar-Button' variant='outline-light'>
                    <NavLink to="/blog/all">Blog</NavLink>
                </Button>
            </div>
        );
    }

    return(
        <div className='MobileBotNav-Nav d-flex justify-content-center'>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>
                <NavLink to="/recipes/all">Recipes</NavLink>
            </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>
                <NavLink to="/shop">Shop</NavLink>
            </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>
                <NavLink to="/about">About</NavLink>
            </Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>
                <NavLink to="/blog/all">Blog</NavLink>
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
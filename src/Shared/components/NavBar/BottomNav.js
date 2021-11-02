import React from 'react';

import Button from 'react-bootstrap/Button';

const BottomNav = props =>{

    if(!props.mobile){
        return(
            <div className='BotNav-Nav d-flex justify-content-center'>
                <Button className='NavBar-Button' variant='outline-light'>Recipes</Button>
                <Button className='NavBar-Button' variant='outline-light'>Shop</Button>
                <Button className='NavBar-Button' variant='outline-light'>About</Button>
                <Button className='NavBar-Button' variant='outline-light'>Blog</Button>
            </div>
        );
    }

    return(
        <div className='MobileBotNav-Nav d-flex justify-content-center'>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>Recipes</Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>Shop</Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>About</Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>Blog</Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>Login <i className="fas fa-sign-in-alt"/></Button>
            <Button size='sm' className='NavBar-Button' variant='outline-dark'>Cart <i className="fas fa-shopping-cart"/></Button>
        </div>
    )
}

export default BottomNav;
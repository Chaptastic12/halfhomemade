import React from 'react';

import Button from 'react-bootstrap/Button';

const BottomNav = props =>{

    return(
        <div className='BotNav-Nav d-flex justify-content-center'>
            <Button className='NavBar-Button' variant='outline-light'>Recipes</Button>
            <Button className='NavBar-Button' variant='outline-light'>Shop</Button>
            <Button className='NavBar-Button' variant='outline-light'>About</Button>
            <Button className='NavBar-Button' variant='outline-light'>Blog</Button>

        </div>
    );
}

export default BottomNav;
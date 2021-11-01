import React from 'react';
import TopNav from './TopNav'
import MidNav from './MidNav'
import BottomNav from './BottomNav'

const NavBar = props =>{

    return(
        <div className='NavBar'>
           <TopNav />
           <MidNav/>
           <BottomNav />
            <div className='Section-Divider' />
        </div>
    )
}

export default NavBar;
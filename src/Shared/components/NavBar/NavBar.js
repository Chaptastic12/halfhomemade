import React, { useContext } from 'react';

import TopNav from './TopNav'
import MidNav from './MidNav'
import BottomNav from './BottomNav'
import MobileNav from './MobileNav';

import { MobileContext } from '../../context/mobile-context';

const NavBar = props =>{

    const { isMobile } = useContext(MobileContext);

    //Check if we are a mobile screen or not. If we are, show the MobileNav.
    return(
        <div className='NavBar'>
            <TopNav/>
            {!isMobile ? 
            <span>
                <MidNav/>
                <BottomNav/>
            </span> 
            : <MobileNav /> }
            <div className='Section-Divider' />
        </div>
    )
}

export default NavBar;
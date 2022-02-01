import React, { useContext, useState, useEffect } from 'react';

import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button, DropdownButton } from 'react-bootstrap'

import NavAlert from './NavAlert';
import BottomNav from './BottomNav';
import NavCanvas from '../UI Elements/NavCanvas';
import DropDownItemHelper from '../../utils/DropDownItemHelper';

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';
import { ShopContext } from '../../context/shop-context';

import './NavBar.css';

const NavBar = props => {

    const history = useHistory();

    const [ showMobileNav, setShowMobileNav ] = useState(false);

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);
    const { quantityInCart, fetchAllCollections, fetchAllProducts, collections } = useContext(ShopContext);

    useEffect(() => {
        fetchAllCollections();
        fetchAllProducts();
    // eslint-disable-next-line
    }, [])

    const logoutAndRedirect = () =>{
        logoutUser();
        setTimeout(()=> { history.push('/') }, 500);
    }

    const adminOptions = [
        { to: '/userPage', desc: 'Profiile'},
        { to: '/recipes/add', desc: 'Add Recipe'},
        { to: '/book/add', desc: 'Add Book'},
        { to: 'admin', desc: 'Admin Dashboard'}
    ]
    
    let profileOptions;
    if(userState.isAdmin){
        profileOptions = <DropdownButton title="Admin" variant='outline-none' className='NavBar-Button'>
                            <DropDownItemHelper data={adminOptions} normalLink={true} />
                        </DropdownButton>
    } else {
        profileOptions = <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/userPage">
                            Profile <i className='fas fa-user' />
                        </Button>
    }

    let loginOrProfile, logoutButton;
    if(!userState.token){
        loginOrProfile = <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/login">
                            Login <i className="fas fa-sign-in-alt"/>
                         </Button>
    } else {
        loginOrProfile = profileOptions;

        logoutButton = <Button variant='outline-none' className='NavBar-Button' onClick={() => logoutAndRedirect()}>
                            Logout <i className="fas fa-sign-out-alt" />
                        </Button>
    }

    return (
        <div className='Site-Nav'>
            <NavAlert invert />

            <Row className='Header'>

                <Col className='Title' as={NavLink} to='/'>
                    <div className='Title-Half'>half</div>
                    <div>Homemade</div>
                </Col>

                <Col className='Subtitle d-none d-lg-flex'>
                    Bringing the finest cuisine to your dinner table
                </Col>
                
                <Col className='d-none d-md-block'>
                    <div className='Login'>
                        { loginOrProfile } { logoutButton } 
                        <Button variant='outline-none' className='NavBar-Button' onClick={()=>handleCartShow()}>Cart ({quantityInCart})<i className="fas fa-shopping-cart"/></Button>
                    </div>
                </Col>

                <Col className='d-block d-md-none'>
                    <div className='Login' onClick={() => setShowMobileNav(true)}>
                        <i className="Hamburger fas fa-bars" />
                    </div>
                </Col>

             </Row>

             <div className='Bottom-Nav'>
                <BottomNav collections={collections}/>
             </div>
             
             <NavCanvas showNav={showMobileNav} closeNav={() => setShowMobileNav(false)} />
        </div>
    )
}

export default NavBar;
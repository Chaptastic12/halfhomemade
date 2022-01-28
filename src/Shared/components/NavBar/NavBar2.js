import React, { useState, useContext, useEffect } from 'react';

import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap'

import NavCanvas from '../UI Elements/NavCanvas';

import TopNav from './TopNav';
import BottomNav from './BottomNav';
import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';
import { ShopContext } from '../../context/shop-context';

import './NavBar.css';

const NavBar2 = props => {

    const [ showNav, setShowNav ] = useState(false);

    const history = useHistory();

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);
    const { quantityInCart, fetchAllCollections, collections } = useContext(ShopContext)

    useEffect(() => {
        fetchAllCollections();
    // eslint-disable-next-line
    }, [])

    const logoutAndRedirect = () =>{
        logoutUser()
        setTimeout(()=> { history.push('/') }, 500);
    }

    let loginOrProfile;
    let logoutButton;
    if(!userState.token){
        loginOrProfile = <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/login">
                            Login <i className="fas fa-sign-in-alt"/>
                         </Button>
    } else {
        loginOrProfile = <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/userProfile">
                            Profile <i className='fas fa-user' />
                        </Button> 
         logoutButton = <Button variant='outline-light' className='NavBar-Button' onClick={() => logoutAndRedirect()}>
                            Logout <i className="fas fa-sign-out-alt" />
                        </Button>
    }

    const loginDiv = <div className='Login d-flex align-items-center'>
                        {/* <i className="Hamburger fas fa-bars" onClick={()=>setShowNav(true)}/> */} { loginOrProfile } { logoutButton } 
                    </div>

    return (
        <div className='Nav'>
            <Row>
                <TopNav />
            </Row>
            <Row className='Header d-flex align-items-center justify-content-center'>
                <Col className='d-none d-sm-block'>
                    { loginDiv }
                </Col>
                <Col>
                    <div className='Title text-center'>
                        <NavLink to='/'>halfHomemade</NavLink>
                    </div>
                </Col>
                <Col>
                    <div className='Cart d-flex justify-content-end'>
                        <Button variant='outline-light' className='NavBar-Button' onClick={()=>handleCartShow()}>Cart ({quantityInCart})<i className="fas fa-shopping-cart"/></Button>
                    </div>
                    <div className='d-sm-none'>{ loginDiv }</div>
                </Col>
            </Row>
            <Row>
                <BottomNav new collections={collections}/>
            </Row>
            <NavCanvas showNav={showNav} closeNav={()=>setShowNav(false)}>
            </NavCanvas>
        </div>
    )
}

export default NavBar2;
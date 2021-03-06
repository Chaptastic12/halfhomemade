import React, { useContext, useState, useEffect } from 'react';

import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button, DropdownButton } from 'react-bootstrap'

import NavBarSearch from './NavBarSearch';
import NavAlert from './NavAlert';
import BottomNav from './BottomNav';
import NavCanvas from '../UI Elements/NavCanvas';
import DropDownItemHelper from '../../utils/DropDownItemHelper';
import NavCanvasItem from '../UI Elements/NavCanvasItem/NavCanvasItem';

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';
import { ShopContext } from '../../context/shop-context';
import { ServerContext } from '../../context/server-context';

import './NavBar.css';

const NavBar = props => {

    const history = useHistory();

    const [ showMobileNav, setShowMobileNav ] = useState(false);
    const [ showSearch, setShowSearch ] = useState(false);

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);
    const { quantityInCart, fetchAllCollections, fetchAllProducts, collections } = useContext(ShopContext);
    const { books, getBooksFromServer, getRecipesFromServer, getProductReviewsFromServer } = useContext(ServerContext)


    //Get everything we need for the site loaded
    useEffect(() => {
        fetchAllCollections();
        fetchAllProducts();
        getBooksFromServer();
        getRecipesFromServer();
        getProductReviewsFromServer();
    // eslint-disable-next-line
    }, [])

    const logoutAndRedirect = () =>{
        logoutUser();
        setTimeout(()=> { history.push('/') }, 500);
    }

    const adminOptions = [
        { to: '/user/profile', desc: 'Profile'},
        { to: '/recipes/add', desc: 'Add Recipe'},
        { to: '/book/add', desc: 'Add Book'}
    ]


    const smallProfileOptions = [
        { to: '/user/profile', desc: 'Profile'},
    ]

    
    let profileOptions;
    if(userState.isAdmin){
        profileOptions = <DropdownButton title="Admin" variant='outline-none' className='NavBar-Button'>
                            <DropDownItemHelper data={adminOptions} normalLink={true}/>
                        </DropdownButton>
    } else {
        profileOptions = <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/user/profile">
                            Profile <i className='fas fa-user' />
                        </Button>
    }

    let loginOrProfile, logoutButton, loginOrLogout;
    if(!userState.token){
        loginOrProfile = <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/login">
                            Login <i className="fas fa-sign-in-alt"/>
                         </Button>
        loginOrLogout = <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/login" onClick={() => setShowMobileNav(false)}>
                            Login <i className="fas fa-sign-in-alt"/>
                        </Button>
    } else {
        loginOrProfile = profileOptions;
        loginOrLogout = <Button variant='outline-none' className='NavBar-Button' onClick={() => logoutAndRedirect()}>
                            Logout <i className="fas fa-sign-out-alt" />
                        </Button>

        logoutButton = <Button variant='outline-none' className='NavBar-Button' onClick={() => {logoutAndRedirect(); setShowMobileNav(false)} }>
                            Logout <i className="fas fa-sign-out-alt" />
                        </Button>
    }

    return (
        <div className='Site-Nav'>
            <NavAlert invert />

            <Row className='Header'>

                <Col className='Subtitle d-none d-lg-flex'>
                    Bringing the finest cuisine <br />to your dinner table
                </Col>

                <Col className='Title' as={NavLink} to='/'>
                    <div>
                        <div className='Title-Half'>half</div>
                        <div>Homemade</div>
                    </div>
                </Col>
                
                <Col className='d-none d-md-block'>
                   { !showMobileNav && <div className='Login'>
                        { !showSearch ? 
                            <>
                                <Button variant='outline-none' className='NavBar-Button' onClick={() =>setShowSearch(true)}>Search <i className='fas fa-search' /></Button>    
                                { loginOrProfile } { logoutButton } 
                                <Button variant='outline-none' className='NavBar-Button' onClick={()=>handleCartShow()}>Cart <i className="fas fa-shopping-cart"/>({quantityInCart})</Button>
                            </> : 
                                <NavBarSearch setShowSearch={(val) => setShowSearch(val)} />
                        }
                    </div> }
                </Col>

                <Col className='d-block d-md-none'>
                    <div className='Login justify-content-end' style={{marginRight: '25px'}} >
                        <i className="Hamburger fas fa-bars" onClick={() => { setShowMobileNav(true); setShowSearch(true)} } />
                    </div>
                </Col>

             </Row>

             <div className='Bottom-Nav d-none d-md-block'>
                <BottomNav collections={collections} books={books}/>
             </div>

             <div className='Section-Divider d-block d-md-none' />
             <div className='Section-Divider d-block d-md-none' />
            
             <NavCanvas showNav={showMobileNav} closeNav={() => { setShowMobileNav(false); setShowSearch(false)} } > 
                <div style={{float: 'right'}}>
                    { loginOrLogout }
                    <Button variant='outline-none' className='NavBar-Button' onClick={()=>handleCartShow()} ><i className="fas fa-shopping-cart" />({quantityInCart})</Button>
                </div>
                <h3>Search</h3> 
                <NavBarSearch setShowSearch={(val) => setShowSearch(val)} />

                {userState.isAdmin ? <div onClick={() => setShowMobileNav(false)}>
                    <h3>Admin</h3>
                    <NavCanvasItem data={adminOptions} normalLink={true} /> 
                </div> : userState.token && <div onClick={() => setShowMobileNav(false)}>
                    <h3>Profile</h3>
                    <NavCanvasItem data={smallProfileOptions} normalLink={true} /> 
                </div>}

                <BottomNav mobile={true} collections={collections} books={books} setShowMobileNav={(val) => setShowMobileNav(val)} /> 
            </NavCanvas>
        </div>
    )
}

export default NavBar;
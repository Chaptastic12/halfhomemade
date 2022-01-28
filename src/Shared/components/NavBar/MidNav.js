import React, { useContext } from 'react';

import { NavLink, useHistory } from 'react-router-dom';
import { Col, Row, Button, DropdownButton, Dropdown } from 'react-bootstrap';

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';
import { ShopContext } from '../../context/shop-context';

import './NavBar.css';

const MidNav = props =>{

    const history = useHistory();
    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);
    const { quantityInCart } = useContext(ShopContext)
;
    let profileOptions;
    if(userState.isAdmin){
        profileOptions = <DropdownButton id="dropdown-basic-button" title="Admin options" variant='outline-light' className='NavBar-Button'>
                            <Dropdown.Item as={NavLink} to='/userPage'>Profile <i className='fas fa-user' /></Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/recipes/add">Add Recipe</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/book/add'>Add Book</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/admin'>Admin</Dropdown.Item>

                        </DropdownButton>
    } else {
        profileOptions = <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/userPage">
                            Profile <i className='fas fa-user' />
                        </Button>
    }

    const logoutAndRedirect = () =>{
        logoutUser()
        setTimeout(()=> { history.push('/') }, 500);
    }
    
    return(
        <Row className='MidNav d-flex align-items-center justify-content-center text-center'>
            <Col></Col>
            <Col>
                <div className='MidNav-Title'><NavLink to='/'>halfHomemade</NavLink></div>
            </Col>
            <Col>
                {!userState.token ? 
                    <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/login">
                        Login <i className="fas fa-sign-in-alt"/>
                    </Button>
                :
                    <div className='NavBar-ProfileOptions'>{profileOptions}</div>
                }

                {userState.token &&
                    <Button variant='outline-light' className='NavBar-Button' onClick={() => logoutAndRedirect()}>
                        Logout <i className="fas fa-sign-out-alt" />
                    </Button>
                }
                <Button variant='outline-light' className='NavBar-Button' onClick={()=>handleCartShow()}>Cart ({quantityInCart})<i className="fas fa-shopping-cart"/></Button>
            </Col>
        </Row>
    )
}

export default MidNav;
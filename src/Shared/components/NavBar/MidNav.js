import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';

import './NavBar.css';

const MidNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);
    
    return(
        <Row className='MidNav d-flex align-items-center justify-content-center text-center'>
            <Col>Some other text can go here</Col>
            <Col>
                <div className='MidNav-Title'><NavLink to='/'>halfHomemade</NavLink></div>
            </Col>
            <Col>
                <Button variant='outline-light' className='NavBar-Button'>
                    {!userState.token ? 
                        <><NavLink to="/login">Login</NavLink> <i className="fas fa-sign-in-alt"/></>
                    :
                        <><NavLink to="/userPage">Profile</NavLink> <i className='fas fa-user' /></>
                    }
                </Button>
                {userState.isAdmin &&
                    <Button variant='outline-light' className='NavBar-Button'>
                        <NavLink to="/recipes/add">Add Recipe</NavLink>
                    </Button>
                }
                {userState.token &&
                    <Button variant='outline-light' className='NavBar-Button' onClick={() => logoutUser()}>
                        Logout <i className="fas fa-sign-out-alt" />
                    </Button>
                }
                <Button variant='outline-light' className='NavBar-Button' onClick={()=>handleCartShow()}>Cart <i className="fas fa-shopping-cart"/></Button>
            </Col>
        </Row>
        )
}

export default MidNav;
import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';

import './NavBar.css';

const MidNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);

    let profileOptions;
    if(userState.isAdmin){
        profileOptions = <DropdownButton id="dropdown-basic-button" title="Admin options" variant='outline-light'>
                            <Dropdown.Item href="#/action-1"><NavLink to="/userPage">Profile <i className='fas fa-user' /></NavLink></Dropdown.Item>
                            <Dropdown.Item href="#/action-2"><NavLink to="/recipes/add">Add Recipe</NavLink></Dropdown.Item>
                            <Dropdown.Item href="#/action-3"><NavLink to="/book/add">Add Book</NavLink></Dropdown.Item>
                        </DropdownButton>
    } else {
        profileOptions = <NavLink to="/userPage">Profile <i className='fas fa-user' /></NavLink>
    }
    
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
                        profileOptions
                    }
                </Button>

                {/* {userState.isAdmin &&
                    <Button variant='outline-light' className='NavBar-Button'>
                        <NavLink to="/recipes/add">Add Recipe</NavLink>
                    </Button>
                } */}

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
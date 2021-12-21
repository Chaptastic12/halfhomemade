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
        profileOptions = <DropdownButton id="dropdown-basic-button" title="Admin options" variant='outline-light' className='NavBar-Button'>
                            <Dropdown.Item as={NavLink} to='/userPage'>Profile <i className='fas fa-user' /></Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/recipes/add">Add Recipe</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/book/add'>Add Book</Dropdown.Item>
                        </DropdownButton>
    } else {
        profileOptions = <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/userPage">
                            Profile <i className='fas fa-user' />
                        </Button>
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
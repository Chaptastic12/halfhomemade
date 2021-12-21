import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';

const BottomNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);

    let profileOptions;
    if(userState.isAdmin){
        profileOptions = <DropdownButton id="dropdown-basic-button" title="Admin" variant='outline-dark' className='NavBar-Button'>
                            <Dropdown.Item as={NavLink} to='/userPage'>Profile <i className='fas fa-user' /></Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/recipes/add">Add Recipe</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/book/add'>Add Book</Dropdown.Item>
                        </DropdownButton>
    } else {
        profileOptions = <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/userPage">
                            Profile <i className='fas fa-user' />
                        </Button>
    }

    if(!props.mobile){
        return(
            <div className='BotNav-Nav d-flex justify-content-center'>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/recipes/all">
                    Recipes
                </Button>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/shop">
                    Shop
                </Button>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/about">
                    About
                </Button>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/blog/all">
                    Blog
                </Button>
            </div>
        );
    }

    return(
        <div className='MobileBotNav-Nav d-flex justify-content-center'>
            <DropdownButton id="dropdown-basic-button" title="Browse" variant='outline-dark' className='NavBar-Button'>
                <Dropdown.Item as={NavLink} to="/recipes/all">Recipes</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/about">About</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/blog/all">Blog</Dropdown.Item>
            </DropdownButton>

            {!userState.token ? 
                <Button className='NavBar-Button' variant='outline-dark' as={NavLink} to="/login">Login</Button>
            :
                <div className='NavBar-ProfileOptions'>{profileOptions}</div>
            }

            {userState.token &&
                <Button variant='outline-dark' className='NavBar-Button' onClick={() => logoutUser()}>Logout</Button>
            }
            <Button className='NavBar-Button' variant='outline-dark' onClick={()=>handleCartShow()}>Cart</Button>
        </div> 
    )
}

export default BottomNav;
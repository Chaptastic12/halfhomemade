import React, { useContext } from 'react';

import { useHistory, NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import DropDownItemHelper from './DropDownItemHelper';

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';

const BottomNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);

    const history = useHistory();

    const recipeNavOptions = [
        { to: '/recipes/search/all', clickParam: null, clickItem: null, desc: 'All'},
        { to: '/recipes/search/stars', clickParam: 'stars', clickItem: 5, desc: 'Best Reviewed'},
        { to: '/recipes/search/japanese', clickParam: 'tag', clickItem:'japanese', desc: 'Japanese Dishes'},
        { to: '/recipes/search/american', clickParam: 'tag', clickItem:'american', desc: 'American Dishes'}
    ];

    const SearchNavOptions = [
        { to: '/shop/search/all', clickParam: null, clickItem: null, desc: 'View All'},
        { to: '/shop/search/shirts', clickParam: 'text', clickItem: 'shirt', desc: 'View Shirts'}
    ]
    
    const profileText = 'Profile' + <i className='fas fa-user' />
    const adminOptions = [
        { to: '/userPage', desc: profileText},
        { to: '/recipes/add', desc: ''},
        { to: '/book/add', desc: ''},
        { to: 'admin', desc: ''}
    ]
    
    let profileOptions;
    if(userState.isAdmin){
        profileOptions = <DropdownButton id="dropdown-basic-button" title="Admin" variant='outline-dark' className='NavBar-Button'>
                            <DropDownItemHelper data={adminOptions} normalLink={true} />
                        </DropdownButton>
    } else {
        profileOptions = <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/userPage">
                            { profileText }
                        </Button>
    }

    const logoutAndRedirect = () =>{
        logoutUser()
        setTimeout(()=> { history.push('/') }, 500);
    }


    return (
            <Row className='text-center justify-content-center'>
                <div className='NavBottom d-flex justify-content-center align-items-center'>
                    <Col xs='auto'>
                        <DropdownButton title={`Recipes`} variant='outline-none' className='NavBar-Button'>
                            <DropDownItemHelper data={recipeNavOptions} searchLink={true} />
                        </DropdownButton>
                    </Col>
                    <Col xs='auto'>
                        <DropdownButton title={`Shop`} variant='outline-none' className='NavBar-Button'>
                            <DropDownItemHelper data={SearchNavOptions} searchLink={true} />
                            <DropDownItemHelper data={props.collections} collections={true} />
                        </DropdownButton> 
                    </Col>
                    <Col xs='auto'>
                        <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/about">About</Button>
                    </Col>
                    <Col xs='auto'>
                        <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/blog/all">Blog</Button>
                    </Col>
                </div>
            </Row>
    )
    
}

export default BottomNav;
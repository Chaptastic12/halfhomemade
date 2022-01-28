import React, { useContext } from 'react';

import { useHistory, NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { v4 as uuid } from 'uuid'

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';
import { SearchContext } from '../../context/search-context';

const BottomNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);
    const { setSearchParam, setSearchItem } = useContext(SearchContext);

    const history = useHistory();

    const recipeNavOptions = [
        { to: '/recipes/search/all', clickParam: null, clickItem: null, desc: 'All'},
        { to: '/recipes/search/stars', clickParam: 'tag', clickItem:'reviews', desc: 'Best Reviewed'},
        { to: '/recipes/search/japanese', clickParam: 'tag', clickItem:'japanese', desc: 'Japanese Dishes'},
        { to: '/recipes/search/american', clickParam: 'tag', clickItem:'american', desc: 'American Dishes'}
    ]

    let profileOptions;
    if(userState.isAdmin){
        profileOptions = <DropdownButton id="dropdown-basic-button" title="Admin" variant='outline-dark' className='NavBar-Button'>
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

    let RecipeNav = <DropdownButton title={`Recipes`} variant='outline-none' className='NavBar-Button'>
                        { recipeNavOptions.map(option => <Dropdown.Item as={NavLink} to={option.to} onClick={ () => { setSearchParam(option.clickParam); setSearchItem(option.clickItem) } }>{option.desc}</Dropdown.Item> ) }
                    </DropdownButton>

    let SearchNav = <DropdownButton title={`Shop`} variant='outline-none' className='NavBar-Button'>
                        <Dropdown.Item as={NavLink} to='/shop/search/all' onClick={ () => { setSearchParam(null); setSearchItem(null) } }>All</Dropdown.Item>
                        { props.collections.map(collection =>  {
                            return <Dropdown.Item 
                                        key={uuid()}
                                        as={NavLink} 
                                        to={`/shop/search/${collection.title.replace(/\s/g,'').toLowerCase()}`} 
                                        onClick={ () => { setSearchParam('collection'); setSearchItem(collection) } }
                                    >
                                        View {collection.title}
                                    </Dropdown.Item> 
                            })
                        }
                        <Dropdown.Item as={NavLink} to='/shop/search/shirts' onClick={ () => { setSearchParam('text'); setSearchItem('shirt') } }>View Shirts</Dropdown.Item>
                    </DropdownButton>

    const logoutAndRedirect = () =>{
        logoutUser()
        setTimeout(()=> { history.push('/') }, 500);
    }

    if(props.new){
        return (
            <div >
                <Row className='text-center justify-content-center'>
                    <div className='NavBottom d-flex justify-content-center align-items-center'>
                        <Col xs='auto'>
                            {/* <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/recipes/all">Recipes <i className="fas fa-chevron-down" /></Button> */}
                            {RecipeNav} 
                        </Col>
                        <Col xs='auto'>
                            {/* <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/shop/search/all">Shop</Button> */}
                            { SearchNav }
                        </Col>
                        <Col xs='auto'>
                            <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/about">About</Button>
                        </Col>
                        <Col xs='auto'>
                            <Button className='NavBar-Button' variant='outline-none' as={NavLink} to="/blog/all">Blog</Button>
                        </Col>
                    </div>
                </Row>
            </div>
        )
    }

    if(!props.mobile){
        return(
            <div className='BotNav-Nav d-flex justify-content-center'>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/recipes/all">
                    Recipes
                </Button>
                <Button className='NavBar-Button' variant='outline-light' as={NavLink} to="/shop/all">
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
                <Dropdown.Item as={NavLink} to="/shop/all">Shop</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/about">About</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/blog/all">Blog</Dropdown.Item>
            </DropdownButton>

            {!userState.token ? 
                <Button className='NavBar-Button' variant='outline-dark' as={NavLink} to="/login">Login</Button>
            :
                <div className='NavBar-ProfileOptions'>{profileOptions}</div>
            }

            {userState.token &&
                <Button variant='outline-dark' className='NavBar-Button' onClick={() => logoutAndRedirect()}>Logout</Button>
            }
            <Button className='NavBar-Button' variant='outline-dark' onClick={()=>handleCartShow()}>Cart</Button>
        </div> 
    )
}

export default BottomNav;
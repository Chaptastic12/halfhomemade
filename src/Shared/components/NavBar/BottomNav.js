import React, { useContext } from 'react';

import { useHistory, NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import { SideDrawerContext } from '../../context/sidedrawer-context';
import { AuthContext } from '../../context/auth-context';
import { SearchContext } from '../../context/search-context';

const BottomNav = props =>{

    const { handleCartShow } = useContext(SideDrawerContext);
    const { userState, logoutUser } = useContext(AuthContext);
    const { setSearchParam, setSearchItem } = useContext(SearchContext);

    const history = useHistory();

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
                        <Dropdown.Item as={NavLink} to='/recipes/search/all' onClick={ () => { setSearchParam(null); setSearchItem(null) } }>All</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to='/recipes/search/stars' onClick={ () => { setSearchParam('tag'); setSearchItem('reviews') } }>Best Reviewed</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to='/recipes/search/japanese' onClick={ () => { setSearchParam('tag'); setSearchItem('japanese') } }>Japanese Dishes</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to='/recipes/search/american' onClick={ () => { setSearchParam('tag'); setSearchItem('american') } }>American Dishes</Dropdown.Item>
                    </DropdownButton>
    let SearchNav = <DropdownButton title={`Shop`} variant='outline-none' className='NavBar-Button'>
                        <Dropdown.Item as={NavLink} to='/shop/search/all' onClick={ () => { setSearchParam(null); setSearchItem(null) } }>All</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to='/shop/search/householditems' onClick={ () => { setSearchParam('collection'); setSearchItem({id: 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzM4ODA3NjQzNzc1Mw==', title: 'Household Items' }) } }>View House items</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to='/shop/search/clothes' onClick={ () => { setSearchParam('collection'); setSearchItem({id: 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzM4ODA3NzIyNDE4NQ==', title: 'Clothes' }) } }>View All Clothes</Dropdown.Item>
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
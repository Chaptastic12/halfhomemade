import React, { useState, useContext } from 'react';

import {Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { SearchContext } from '../../context/search-context';

import './NavBar.css';

const NavBarSearch = props =>{

    const [ searchPage, setSearchPage ] = useState('');
    const [ searchText, setSearchText ] = useState('');

    const history = useHistory();

    const { setSearchItem, setSearchParam } = useContext(SearchContext);

    const handleSearch = () =>{
        setSearchParam('text');
        setSearchItem(searchText);
        switch (searchPage){
            case 'products':
                history.push('/shop/search/filter');
                break;
            case 'recipes':
                history.push('/recipes/search/' + searchText);
                break;
            default:
                //mistake if we get here
                break;
        }
    }

    return(
        <div className='SearchBar'>
            <InputGroup size='sm'>
                <FormControl
                placeholder="Search"
                aria-label="Search recipes or products"
                value={searchText}
                onChange={(e)=> setSearchText(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={()=> handleSearch()}><i className='fas fa-search' /></Button>
                <Button variant="outline-secondary" onClick={()=>props.setShowSearch(false)}><i className="fas fa-times-circle" /></Button>
            </InputGroup>
            <div className="mb-3">
                <Form.Check
                    inline
                    label="Recipes"
                    type='checkbox'
                    checked={searchPage === 'recipes'}
                    onChange={() =>setSearchPage('recipes')}
                />
                <Form.Check
                    inline
                    label="Products"
                    type='checkbox'
                    checked={searchPage === 'products'}
                    onChange={() =>setSearchPage('products')}
                />
            </div>
        </div>
    )
}

export default NavBarSearch
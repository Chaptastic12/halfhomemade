import React, { useState } from 'react';

import {Button, Form, InputGroup, FormControl } from 'react-bootstrap';

import './NavBar.css';

const NavBarSearch = props =>{

    const [ searchPage, setSearchPage ] = useState('');
    const [ searchText, setSearchText ] = useState('');

    return(
        <div className='SearchBar'>
            <InputGroup size='sm'>
                <FormControl
                placeholder="Search"
                aria-label="Search recipes or products"
                value={searchText}
                onChange={(e)=> setSearchText(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={()=> props.handleSearch(searchPage, searchText)}><i className='fas fa-search' /></Button>
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
import React from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import './PageHeader.css';

const PageHeader = props =>{
    const location = useLocation();
    let page = location.pathname.split('/');
    
    const capitalizeFirstLetter = string =>{
        return string.charAt(0).toUpperCase() + string.slice(1); 
    }

    return(
        <Container className='PageHeader d-flex justify-content-center align-items-center'>
            <h1 className='pageHeader-title text-center'>{capitalizeFirstLetter(page[1])} / {capitalizeFirstLetter(page[2])}</h1>
        </Container>
)
}

export default PageHeader;
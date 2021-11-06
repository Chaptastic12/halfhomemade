import React from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import './PageHeader.css';

const PageHeader = props =>{
    //Grab the important URL bits we need and split them up by the '/' sign into an array
    // page[0] is a /, page[1] is the first item and page[2] is the
    const location = useLocation();
    let page = location.pathname.split('/');
    
    const capitalizeFirstLetter = string =>{
        return string.charAt(0).toUpperCase() + string.slice(1); 
    }

    //Check if we get a background image or a color.
    //Color should be in RGBA if received
    let style;
    if(props.backgroundImage){
        style = {backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), URL('+props.backgroundImage+')'};
    } else if(props.backgroundColor){
        style = {background: props.backgroundColor};
    }

    let secondHref;
    if(page[2]){
        secondHref = <span> / {capitalizeFirstLetter(page[2])}</span>
    } else {
        secondHref = <span></span>
    }

    return(
        <Container className='PageHeader d-flex justify-content-center align-items-center' style={style}>
            <h1 className='pageHeader-title text-center'>{capitalizeFirstLetter(page[1])} {secondHref}</h1>
        </Container>
)
}

export default PageHeader;
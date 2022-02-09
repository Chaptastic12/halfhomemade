import React, { useContext } from 'react';

import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { SearchContext } from '../../../context/search-context';

const NavCanvasItem = props =>{

    const { setSearchParam, setSearchItem } = useContext(SearchContext);

    let link;
    if(props.collections){
        link = props.data.map(collection =>{
                return <ListGroup.Item key={uuid()} as={NavLink} to={`/shop/search/${collection.title.replace(/\s/g,'').toLowerCase()}`} 
                    onClick={ () => { setSearchParam('collection'); setSearchItem(collection) }}
                >
                    View {collection.title}
                </ListGroup.Item>
        })
    }

    if(props.books){
        link = props.data.map(book =>{
            return <ListGroup.Item key={uuid()} as={NavLink}
                        to={`/books/search/${book.bookTitle.replace(/\s/g,'').toLowerCase()}`}
                        onClick={ () => { setSearchParam('book'); setSearchItem(book) } }
                    >
                        View {book.bookTitle}    
                    </ListGroup.Item>
        })
    }

    if(props.normalLink){
        link = props.data.map(option => <ListGroup.Item key={uuid()} as={NavLink} to={option.to}>{ option.desc }</ListGroup.Item> );
    }

    if(props.searchLink){
        link = props.data.map(option =>{
             return <ListGroup.Item key={uuid()} as={NavLink} to={option.to} onClick={ () => { setSearchParam(option.clickParam); setSearchItem(option.clickItem) } }>{option.desc}</ListGroup.Item> 
        });
    }

    return <ListGroup variant="flush"> { link }</ListGroup>
}

export default NavCanvasItem;
import { useContext } from "react";

import { NavLink } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { SearchContext } from "../context/search-context";

const DropDownItemHelper = props =>{

    const { setSearchItem, setSearchParam } = useContext(SearchContext);
    
    let link;
    if(props.collections){
        if(props.footer){
            link = props.data.map(collection =>{
                return <li key={uuid()}><NavLink
                            to={`/shop/search/${collection.title.replace(/\s/g,'').toLowerCase()}`} 
                            onClick={ () => { setSearchParam('collection'); setSearchItem(collection) } }
                        >
                            View {collection.title}
                        </NavLink></li>
            })
        }else {
            link = props.data.map(collection =>  {
                return <Dropdown.Item key={uuid()} as={NavLink} 
                            to={`/shop/search/${collection.title.replace(/\s/g,'').toLowerCase()}`} 
                            onClick={ () => { setSearchParam('collection'); setSearchItem(collection) } }
                        >
                            View {collection.title}
                        </Dropdown.Item> 
            })
        }
    }

    if(props.books){
        if(props.footer){
            link = props.data.map(book =>{
                return <li key={uuid()}><NavLink
                            to={`/books/search/${book.bookTitle.replace(/\s/g,'').toLowerCase()}`}
                            onClick={ () => { setSearchParam('book'); setSearchItem(book) } }
                        >
                            View {book.bookTitle}    
                        </NavLink></li>
            })
        }else{
            link = props.data.map(book =>{
                return <Dropdown.Item key={uuid()} as={NavLink}
                            to={`/books/search/${book.bookTitle.replace(/\s/g,'').toLowerCase()}`}
                            onClick={ () => { setSearchParam('book'); setSearchItem(book) } }
                        >
                            View {book.bookTitle}    
                        </Dropdown.Item>
            })
        }
    }

    if(props.normalLink){
        if(props.footer){
            link = props.data.map(option => <li key={uuid()}><NavLink  as={NavLink} to={option.to}>{ option.desc }</NavLink></li> );

        }else {
            link = props.data.map(option => <Dropdown.Item key={uuid()} as={NavLink} to={option.to}>{ option.desc }</Dropdown.Item> );
        }
    }

    if(props.searchLink){
        if(props.footer){
            link = props.data.map(option => <li key={uuid()}><NavLink  as={NavLink} to={option.to} onClick={ () => { setSearchParam(option.clickParam); setSearchItem(option.clickItem) } }>{option.desc}</NavLink></li> );
        }else {
            link = props.data.map(option => <Dropdown.Item key={uuid()} as={NavLink} to={option.to} onClick={ () => { setSearchParam(option.clickParam); setSearchItem(option.clickItem) } }>{option.desc}</Dropdown.Item> );
        }
    }
    
    return link;
}

export default DropDownItemHelper;
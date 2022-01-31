import { useContext } from "react";

import { NavLink } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { SearchContext } from "../../context/search-context";

const DropDownItemHelper = props =>{

    const { setSearchItem, setSearchParam } = useContext(SearchContext);
    
    let dropDownItems;
    if(props.collections){
        dropDownItems = props.data.map(collection =>  {
            return <Dropdown.Item key={uuid()} as={NavLink} 
                        to={`/shop/search/${collection.title.replace(/\s/g,'').toLowerCase()}`} 
                        onClick={ () => { setSearchParam('collection'); setSearchItem(collection) } }
                    >
                        View {collection.title}
                    </Dropdown.Item> 
        })
    }


    if(props.normalLink){
        console.log(props.data)
        dropDownItems = props.data.map(option => <Dropdown.Item key={uuid()} as={NavLink} to={option.to}>{ option.desc }</Dropdown.Item> );
    }

    if(props.searchLink){
        dropDownItems = props.data.map(option => <Dropdown.Item key={uuid()} as={NavLink} to={option.to} onClick={ () => { setSearchParam(option.clickParam); setSearchItem(option.clickItem) } }>{option.desc}</Dropdown.Item> );
    }

    return dropDownItems;
}

export default DropDownItemHelper;
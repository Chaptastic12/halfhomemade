import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Form, Row, Col, Button } from 'react-bootstrap'

import './ProductSearch.css';

const ProductSearch = props =>{

    const [ selectedCollection, setSelectedCollection ] = useState({title: 'all', id: 'all'});
    const [ searchText, setSearchText ] = useState('');
    const [ inStock, setInStock ] = useState(false);

    useEffect(() =>{
        setSelectedCollection({title: 'all', id: 'all'})
    }, [])

    useEffect(() => {
        //Check if we are passing in parameters we want to show immediately
        if(props.existingData){
            //If we have a tag we're filtering by, display it in the input field; Otherwise, set it to null
            if(props.existingData.searchParam === 'text'){
                setSearchText(props.existingData.searchItem);
            }else{
                setSearchText('');
            }
            //If we are filtering by stars, dispaly it in the drop down; otherwise, set it to be for all options
            if(props.existingData.searchParam === 'collection'){
                setSelectedCollection({title: props.existingData.searchItem.title, id: props.existingData.searchItem.id});
            }else{
                setSelectedCollection({title: 'all', id: 'all'})
            }
        }
    }, [props.existingData])

    const updatedCollection = collectionId =>{
        if(collectionId === 'all'){
            setSelectedCollection({title: 'all', id: 'all'})
            return;
        }
        let chosenCollection = props.collections.find( collection => collection.id === collectionId );
        setSelectedCollection(chosenCollection)
    }
 
    return(<div className='ProductSearch'>
        <Row>
            <Col xs={12} lg={5} />
            <Form.Group className="mb-3" as={Col}>
                <Form.Label><small>Search Text</small></Form.Label>
                <Form.Control size='sm' type="text" placeholder="Search Text" value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" as={Col}>
                <Form.Label><small>Choose Collection</small></Form.Label>
                <Form.Select size='sm' value={selectedCollection.id} onChange={e => updatedCollection(e.target.value)}>
                    <option key={uuid()} value='all'>All</option>
                    {props.collections.map(collection => {
                        return <option key={uuid()} value={collection.id}>{collection.title}</option>
                    })}
                </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3 d-flex align-items-end" as={Col} >
                <Form.Check size='sm' type="checkbox" label="Instock" onChange={ e => setInStock(e.target.checked) }/>
                <Button  size='sm' variant="primary" type="button" as={Link} to ='/shop/search/filter' onClick={() => props.submitSearch(selectedCollection, searchText, inStock)} style={{marginLeft: '15px'}}>
                    Search
                </Button>
                <Button  size='sm' variant="primary" type="button" as={Link} to ='/shop/search/filter' onClick={() => props.submitSearch({title: 'all', id: 'all'} , '', false)} style={{marginLeft: '5px'}}>
                    Cancel
                </Button>
            </Form.Group>
        </Row>
    </div>)
}

export default ProductSearch;
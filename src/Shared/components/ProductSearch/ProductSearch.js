import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Form, Row, Button } from 'react-bootstrap'

import './ProductSearch.css';

const ProductSearch = props =>{

    const [ selectedCollection, setSelectedCollection ] = useState({title: 'all', id: 'all'});
    const [ searchText, setSearchText ] = useState();

    useEffect(() =>{
        setSelectedCollection({title: 'all', id: 'all'})
    }, [])

    const updatedCollection = collectionId =>{
        if(collectionId === 'all'){
            setSelectedCollection({title: 'all', id: 'all'})
            return;
        }
        let chosenCollection = props.collections.find( collection => collection.id === collectionId );
        setSelectedCollection(chosenCollection)
    }

    return(<div className='ProductSearch'>
        <Form>
            <Row className="mb-3">
                <Form.Group>
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" placeholder="Search Text" onChange={e => setSearchText(e.target.value)}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group>
                    <Form.Label>Collection</Form.Label>
                    <Form.Select value={selectedCollection.id} onChange={e => updatedCollection(e.target.value)}>
                        <option key={uuid()} value='all'>All</option>
                        {props.collections.map(collection => {
                            return <option key={uuid()} value={collection.id}>{collection.title}</option>
                        })}
                    </Form.Select>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" >
                <Form.Check type="checkbox" label="Include instock only" />
            </Form.Group>

            <Button variant="primary" type="button" as={Link} to ='/shop/search' onClick={() => props.submitSearch(selectedCollection, searchText)}>
                Search
            </Button>
        </Form>
    </div>)
}

export default ProductSearch;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import { Form, Button, Row, Col } from 'react-bootstrap';

const RecipeSearch = props => {

    const [ searchTitle, setSearchTitle ] = useState(null);
    const [ searchTag, setSearchTag ] = useState(null);
    const [ searchBook, setSearchBook ] = useState('');
    const history = useHistory();


    //Create our list of book options
    let bookOptions = props.books.map( book => {
        return <option key={uuid()} value={book._id}>{book.bookTitle}</option>
    })
   
    return (
        <div className='d-flex justify-content-center align-items-center' style={{paddingTop: '10px'}}>
            <Row>
                <Form.Group className="mb-3" as={Col}>
                    <Form.Label><small>Title</small></Form.Label>
                    <Form.Control size='sm' type="text" placeholder={searchTitle ? searchTitle : 'Search by Title'}  onChange={e => setSearchTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                    <Form.Label><small>Tag</small></Form.Label>
                    <Form.Control size='sm' type="text" placeholder={searchTag ? searchTag : 'Search by Tag'} onChange={e => setSearchTag(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                    <Form.Label><small>Book Selection</small></Form.Label>
                    <Form.Select size='sm' aria-label="Select Recipe Book" value={searchBook} onChange={ e => setSearchBook(e.target.value) }>
                        {bookOptions}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-end" as={Col}>
                    <Button type='button' size='sm' onClick={() => props.submitRecipeSearch(searchTitle, searchTag, searchBook) } style={{marginRight: '5px'}}>
                        Search
                    </Button>
                    <Button type='button' size='sm' onClick={() => { props.submitRecipeSearch('', '', ''); history.push('/recipes/search/all');} }>
                        Cancel
                    </Button>
                </Form.Group>
            </Row>
        </div>
    )
}

export default RecipeSearch;
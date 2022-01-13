import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

const RecipeSearch = props => {

    const [ searchTitle, setSearchTitle ] = useState(null);
    const [ searchTag, setSearchTag ] = useState(null);

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder={searchTitle} onChange={e => setSearchTitle(e.target.value)} />
  
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" placeholder={searchTag} onChange={e => setSearchTag(e.target.value)} />
            </Form.Group>
            <Button type='button' onClick={() => props.submitRecipeSearch(searchTitle, searchTag)}>
                Search
            </Button>
        </div>
    )
}

export default RecipeSearch;
import React, { useState } from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';

const RecipeSearch = props => {

    const [ searchTitle, setSearchTitle ] = useState(null);
    const [ searchTag, setSearchTag ] = useState(null);

    return (
        <div className='d-flex justify-content-center align-items-center' style={{paddingTop: '10px'}}>
            <Row>
                <Form.Group className="mb-3" as={Col}>
                    {/* <Form.Label>Title</Form.Label> */}
                    <Form.Control type="text" placeholder={searchTitle ? searchTitle : 'Search by Title'}  onChange={e => setSearchTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                    {/* <Form.Label>Tag</Form.Label> */}
                    <Form.Control type="text" placeholder={searchTag ? searchTag : 'Search by Tag'} onChange={e => setSearchTag(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-end" as={Col}>
                    <Button type='button' onClick={() => props.submitRecipeSearch(searchTitle, searchTag)}>
                        Search
                    </Button>
                </Form.Group>
            </Row>
        </div>
    )
}

export default RecipeSearch;
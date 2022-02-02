import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import { Form, Button, Row, Col } from 'react-bootstrap';

import { SearchContext } from '../../context/search-context';

const RecipeSearch = React.memo(props => {

    const { setSearchItem, setSearchParam } = useContext(SearchContext);

    const [ searchTitle, setSearchTitle ] = useState(null);
    const [ searchTag, setSearchTag ] = useState(null);
    const [ searchBook, setSearchBook ] = useState(props.books[0]);
    const [ rating, setRating ] = useState(0);

    useEffect(() => {
        //Check if we are passing in parameters we want to show immediately
        if(props.existingData){
            //If we have a tag we're filtering by, display it in the input field; Otherwise, set it to null
            if(props.existingData.searchParam === 'tag'){
                setSearchTag(props.existingData.searchItem);
            }else{
                //setSearchTag(null);
            }
            //If we are filtering by stars, dispaly it in the drop down; otherwise, set it to be for all options
            if(props.existingData.searchParam === 'stars'){
                setRating(props.existingData.searchItem);
            }else{
                //setRating(0)
            }
        }
    }, [props.existingData])

    const history = useHistory();

    //Create our list of book options
    let bookOptions = props.books.map( book => {
        return <option key={uuid()} value={book}>{book.bookTitle}</option>
    })
   
    return (
        <div className='d-flex justify-content-end align-items-center' style={{paddingTop: '10px', marginRight: '10vw'}}>
            <Row>
                <Form.Group className="mb-3" as={Col} xs={6} md='auto'>
                    <Form.Label><small>Title</small></Form.Label>
                    <Form.Control size='sm' type="text" placeholder={searchTitle ? searchTitle : 'Search by Title'}  onChange={e => setSearchTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} xs={6} md='auto'>
                    <Form.Label><small>Tag</small></Form.Label>
                    <Form.Control size='sm' type="text" placeholder={searchTag ? searchTag : 'Search by Tag'} value={searchTag ? searchTag : ''} onChange={e => setSearchTag(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} xs={6} md='auto'>
                    <Form.Label><small>Book Selection</small></Form.Label>
                    <Form.Select size='sm' aria-label="Select Recipe Book" value={searchBook} onChange={ e => setSearchBook(e.target.value) }>
                        {bookOptions}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} xs={6} md='auto'>
                    <Form.Label><small>Choose Rating</small></Form.Label>
                    <Form.Select size='sm' value={rating} onChange={e => setRating(e.target.value)}>
                        <option key={uuid()} value={0} selected={rating === 0 ? true : false}>All ratings</option>
                        <option key={uuid()} value={5} selected={rating === 5 ? true : false}>5 stars</option>
                        <option key={uuid()} value={4} selected={rating === 4 ? true : false}>4 Stars</option>
                        <option key={uuid()} value={3} selected={rating === 3 ? true : false}>3 Stars</option>
                        <option key={uuid()} value={2} selected={rating === 2 ? true : false}>2 Stars</option>
                        <option key={uuid()} value={1} selected={rating === 1 ? true : false}>1 Star</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-end" as={Col} xs={2} md='auto'>
                    <Button type='button' size='sm' onClick={() => { props.submitRecipeSearch(searchTitle, searchTag, searchBook, rating); setSearchItem(null); setSearchParam(null) } } style={{marginRight: '5px'}}>
                        Search
                    </Button>
                    <Button type='button' size='sm' onClick={() => { props.submitRecipeSearch('', '', '', 0); history.push('/recipes/search/all');} }>
                        Cancel
                    </Button>
                </Form.Group>
            </Row>
        </div>
    )
})

export default RecipeSearch;
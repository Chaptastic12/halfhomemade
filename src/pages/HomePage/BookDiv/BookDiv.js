import React, { useContext} from 'react';

import { NavLink } from 'react-router-dom';

import { Col, Row, Button } from 'react-bootstrap';

import useProgressiveImage from '../../../Shared/hooks/lazyLoad-hook';
import { SearchContext } from '../../../Shared/context/search-context';

import BookCover from '../../../Shared/Img/Food/webp/Cover.webp'
import DivBackground from '../../../Shared/Img/Food/webp/Back_Plate_ChrJo.webp'

import './BookDiv.css';

const BookDiv = props =>{

    const loadedBookCover = useProgressiveImage(BookCover);
    const loadedDivBackground = useProgressiveImage(DivBackground)
    const { setSearchParam, setSearchItem } = useContext(SearchContext);

    return (
        <div className='BookDiv' style={{backgroundImage: 'URL(' + loadedDivBackground || null + ')'}} >
            <Row>
                <Col xs={6}>            
                    <div className="Main" style={{backgroundImage: 'URL(' + loadedBookCover || null + ')'}}>
                        <div className='Details'>
                            <h1>Check out our new book!</h1>
                            <p className='Subtext'>Bringing the best recipes from around the world to one book, right in your kitchen.<span className='d-none d-md-block'>
                            With recipes from Japan to America, you're sure to find something to enjoy for even the pickiest of eaters.</span></p>
                            <span>
                                <Button variant='outline-dark' as={NavLink} to='/shop/search/all' onClick={()=> { setSearchParam(null); setSearchItem(null) }}>Buy the book </Button>
                                <Button variant='outline-dark' as={NavLink} to ='/recipes/search/all' onClick={()=> { setSearchParam('book'); setSearchItem("61cf59095e855573649abf1a") }}>View Recipes</Button>
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default BookDiv;
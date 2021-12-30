import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ShopContext } from '../../Shared/context/shop-context';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductCard from '../../Shared/components/ProductCard/ProductCard';
import ProductSearch from'../../Shared/components/ProductSearch/ProductSearch';

import './ShopPage.css';

const ShopPage = props => {

    const { fetchAllProducts, products, fetchAllCollections, collections, fetchCollectionById, collection } = useContext(ShopContext);

    const { id } = useParams();

    useEffect( () =>{
        fetchAllProducts();

        fetchAllCollections();

        // eslint-disable-next-line
    }, []);

    const [ loadedProducts, setLoadedProducts ] = useState(products);
    const [ headerText, setHeaderText ] = useState('All');

    useEffect(() => {
        if(id === 'search'){
            setLoadedProducts(collection.products);
        } else{
            setLoadedProducts(products);
        }
    }, [ id, collection, products ])

    const searchFormSubmitHandler = (collection, filterText) => {
        if(collection.id === null){
            setLoadedProducts(products);
            setHeaderText('All')
        } else {
            fetchCollectionById(collection.id);
            setHeaderText('Search / ' + collection.title)
        }
    }

    return (
        <div className='ShopPage'>
            <h1>{headerText}</h1>
            <Container className='d-flex justify-content-center'>
                <Col sm={2}>
                    <ProductSearch collections={collections} submitSearch={(id) => searchFormSubmitHandler(id)}/>
                </Col>
                <Col sm={1} />
                <Col sm={9}>
                    <Row>
                        {loadedProducts.map(product => { return <ProductCard key={product.id} id={product.id} title={product.title} description={product.description} image={product.images[0].src} /> })}
                    </Row>
                </Col>
            </Container>
        </div>
    )
}

export default ShopPage;
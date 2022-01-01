import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ShopContext } from '../../Shared/context/shop-context';

import { Row, Col } from 'react-bootstrap';

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
    const [ showAll, setShowAll ] = useState(true);

    useEffect(() => {
        if(!showAll){
            setLoadedProducts(collection.products);
        } else{
            setLoadedProducts(products);
        }
    // eslint-disable-next-line
    }, [ id, collection ])

    const searchFormSubmitHandler = (collection, filterText) => {
        if(collection.id === 'all'){
            setLoadedProducts(products);
            setShowAll(true)
            setHeaderText('All')
        } else {
            fetchCollectionById(collection.id);
            setHeaderText('Search / ' + collection.title)
            setShowAll(false);
        }
    }
    if(!loadedProducts){
        return <div>Loading...</div>
    } else {
        return (
            <div className='ShopPage'>
                <h1 className='text-center'>{headerText}</h1>
                <div>
                    <Row>
                        <Col sm={3}>
                            <ProductSearch collections={collections} submitSearch={(id) => searchFormSubmitHandler(id)}/>
                        </Col>
                        <Col sm={8}>
                            <Row className='ShopPage-Products'>
                                {loadedProducts.map(product => { return <ProductCard key={product.id} id={product.id} title={product.title} description={product.description} image={product.images[0].src} /> })}
                            </Row>
                        </Col>
                        <Col sm={1} />
                    </Row>
                </div>
            </div>
        )
    }

}

export default ShopPage;
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
    }, [ id, collection, products ])

    const searchFormSubmitHandler = (collection, filterText) => {
        //If we are set to look at all products
        if(collection.id === 'all'){
            //If no text is sent, just load them all
            if(filterText === undefined || ''){
                setLoadedProducts(products);
            } else {
                //If text is sent, search through all the products for a match to our search criteria
                let searchedProducts = products.filter(x => x.title.toLowerCase().includes(filterText.toLowerCase()));
                setLoadedProducts(searchedProducts);
            }
            setShowAll(true)
            setHeaderText('All')
        } else {
            //If we are sorting by a specific collection
            if(filterText === undefined || ''){
                //No search text means we just need them all
                fetchCollectionById(collection.id);
            } else {
                //If search text is sent, find the collection we need and then filter the products by our search filter
                let collectionIndex = collections.findIndex(i => i.id === collection.id);
                let searchedCollection = collections[collectionIndex].products.filter(x => x.title.toLowerCase().includes(filterText.toLowerCase()));
                setLoadedProducts(searchedCollection);
            }
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
                            <ProductSearch collections={collections} submitSearch={(id, text) => searchFormSubmitHandler(id, text)}/>
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
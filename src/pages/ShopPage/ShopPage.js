import React, { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../../Shared/context/shop-context';
import { SearchContext } from '../../Shared/context/search-context';
import PaginationComponent from '../../Shared/components/UI Elements/Pagination/Pagination';

import { Spinner, Row, Container } from 'react-bootstrap';

import ProductCard from '../../Shared/components/ProductCard/ProductCard';
import ProductSearch from'../../Shared/components/ProductSearch/ProductSearch';

import './ShopPage.css';

const ITEMS_PER_PAGE = 8;

const ShopPage = props => {

    const { products, collections, collection } = useContext(ShopContext);
    const { searchItem, searchParam } = useContext(SearchContext)

    const [ loadedProducts, setLoadedProducts ] = useState(products);
    const [ headerText, setHeaderText ] = useState('Showing all products');
    const [ showAll, setShowAll ] = useState(true);
    const [ pageNumber, setPageNumber ] = useState(1);

    useEffect(() => {
        if(!loadedProducts){
            if(!showAll){
                setLoadedProducts(collection.products);
            } else{
                setLoadedProducts(products);
            }
        } else {
            setLoadedProducts(products);
        }   
    // eslint-disable-next-line
    }, [ collection, products ])

    const searchFormSubmitHandler = (collection, filterText, instock, filterRating) => {
        console.log(filterRating)
        let finalSearchedProducts;
        //If we are set to look at all products
        if(collection.id === 'all'){
            //If no text is sent, just load them all
            if(filterText === ( undefined || '' )){
                finalSearchedProducts = [...products]
                setHeaderText('Showing all products')
            } else {
                //If text is sent, search through all the products for a match to our search criteria
                finalSearchedProducts = products.filter(x => x.title.toLowerCase().includes(filterText.toLowerCase()));
                setHeaderText(`Showing all products containing '` + filterText + `'`)
            }
            setShowAll(true)
        } else {
            //If we are sorting by a specific collection
            if(filterText === ( undefined || '' )){
                //No search text means we just need them all
                let collectionIndex = collections.findIndex(i => i.id === collection.id);
                finalSearchedProducts = collections[collectionIndex].products;
                setHeaderText('Showing all products in ' + collection.title)
            } else {
                //If search text is sent, find the collection we need and then filter the products by our search filter
                let collectionIndex = collections.findIndex(i => i.id === collection.id);
                finalSearchedProducts = collections[collectionIndex].products.filter(x => x.title.toLowerCase().includes(filterText.toLowerCase()));
                setHeaderText('Showing all products in ' + collection.title + ` containing '` + filterText + `'`)
            }
            setShowAll(false);
        }

        if(filterRating !== 0){
            finalSearchedProducts = finalSearchedProducts.filter( x => x.rating >= filterRating );
        }

        if(instock){
            finalSearchedProducts = finalSearchedProducts.filter(x => x.availableForSale === true );
            setLoadedProducts(finalSearchedProducts);
        }else{
            setLoadedProducts(finalSearchedProducts);
        }

    }

    useEffect(() => {
        if(loadedProducts){
            if(searchParam !== null){
                switch(searchParam){
                    case('text'):
                        searchFormSubmitHandler({id: 'all' }, searchItem, null);
                        break;
    
                    case('collection'):
                        searchFormSubmitHandler(searchItem, '', null);
                        break;
    
                    default:
                        break;
                }
            } else{
                searchFormSubmitHandler({id: 'all'}, '', null);
            }
        } else{
            searchFormSubmitHandler({id: 'all'}, '', null);
        }
    //eslint-disable-next-line
    }, [searchParam, searchItem])
    
    if(!loadedProducts){
        return <div className='spinner'><Spinner animation="border" /></div>
    } else {
        //Next three lines are needed for pagination
        const indexStart = (~ITEMS_PER_PAGE + 1) + (ITEMS_PER_PAGE * pageNumber);
        const indexEnd = indexStart + ITEMS_PER_PAGE;
        const numberOfPages = Math.ceil((loadedProducts.length)/ITEMS_PER_PAGE)

        const shopProducts = loadedProducts.slice(indexStart, indexEnd).map(product => { 
            return <ProductCard key={product.id} product={product} id={product.id} title={product.title} description={product.description} image={product.images[0].src} /> 
        })
        return (
            <div className='ShopPage'>
                <Container>
                    <h1 className='ShopPage-Title'>{headerText}</h1>
                    <Row>
                        <ProductSearch collections={collections} submitSearch={(id, text, instock, filterRating) => searchFormSubmitHandler(id, text, instock, filterRating)}/>
                    </Row>
                    <Row className='ShopPage-Products'>
                        { shopProducts }
                        { loadedProducts && <PaginationComponent active={pageNumber} changePage={(num) => setPageNumber(num)} number={numberOfPages} /> }
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ShopPage;
import { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: 'halfhomemade.myshopify.com',
    storefrontAccessToken: '8ad5634bac097e081d905c741aa81503'
});

const ShopContext = createContext();

const ShopProvider = props => {

    const [ products, setProducts ] = useState([]);
    const [ product, setProduct ] = useState({});
    const [ checkout, setCheckout ] = useState({});
    const [ collections, setCollections ] = useState([]);
    const [ collection, setCollection ] = useState([]);

    useEffect(()=>{
        createCheckout();
    },[]);

    const createCheckout = async () =>{
        const newCheckout = await client.checkout.create();        
        setCheckout(newCheckout);
    }

    const addItemsToCheckout = async (variantID, quatnity) => {
        const lineItemsToAdd = [{
            variantID,
            quantity: parseInt(quatnity, 10)
        }];

        const updateCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
        setCheckout(updateCheckout);
    }

    const removeItemsFromCheckout = async (variantID) => {
        const lineItemsToRemove = [ variantID ];
        
        const updateCheckout = await client.checkout.removeLineItems(checkout.id, lineItemsToRemove);
        setCheckout(updateCheckout);
    }

    const fetchAllProducts = async () => {
        const products = await client.product.fetchAll();

        setProducts(products);
    }

    const fetchProductById = async (id) => {
        const product = await client.product.fetch(id);

        setProduct(product);
    }

    const fetchAllCollections = async () => {
        const collections = await client.collection.fetchAllWithProducts();

        setCollections(collections);
    }

    const fetchCollectionById = async (id) => {
        const collection = await client.collection.fetchWithProducts(id);
        setCollection(collection);
    }

    return (
        <ShopContext.Provider value={{
            products, product, checkout, collections, collection,
            fetchAllProducts, fetchProductById, fetchAllCollections, fetchCollectionById,
            addItemsToCheckout, removeItemsFromCheckout
        }}>
             {props.children }
        </ShopContext.Provider>
    )
}

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext }

export default ShopProvider;
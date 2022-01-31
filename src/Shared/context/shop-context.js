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
    const [ quantityInCart, setQuantityInCart ] = useState(0);

    useEffect(()=>{
        createCheckout();
    },[]);

    useEffect(()=>{
        checkTotalItemsInCart();
    //eslint-disable-next-line
    }, [checkout])

    const createCheckout = async () =>{
        const newCheckout = await client.checkout.create();        
        setCheckout(newCheckout);
    }
    const addItemsToCheckout = async (variantId, quantity) =>{
        const lineItemsToAdd = [{
          variantId,
          quantity: parseInt(quantity, 10)
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

    const checkTotalItemsInCart = () => {
        let numberOfItems = 0;
        if(checkout.lineItems && checkout.lineItems.length > 0){
            for(let i=0; i < checkout.lineItems.length; i++){
                numberOfItems += checkout.lineItems[i].quantity;
            }
            setQuantityInCart(numberOfItems);
        }
    }

    const clearCart = async (ids) => {
        console.log(ids)
        const updateCheckout = await client.checkout.removeLineItems(checkout.id, ids);

        setCheckout(updateCheckout);
    }

    return (
        <ShopContext.Provider value={{
            products, product, checkout, collections, collection, quantityInCart,
            fetchAllProducts, fetchProductById, fetchAllCollections, fetchCollectionById,
            addItemsToCheckout, removeItemsFromCheckout, clearCart
        }}>
             {props.children }
        </ShopContext.Provider>
    )
}

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext }

export default ShopProvider;
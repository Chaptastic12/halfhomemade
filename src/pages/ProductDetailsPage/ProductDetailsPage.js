import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap'

import { ShopContext } from '../../Shared/context/shop-context';

import  './ProductDetailsPage.css';

const ProductDetailsPage = props => {

    const { id } = useParams();
    const { fetchProductById, product, addItemsToCheckout } = useContext(ShopContext);
    const [ quantity, setQuantity ] = useState('1');
    const [ selections, setSelections ] = useState([]);
    const [ chosenVariant, setChosenVariant ] = useState();

    useEffect(() => {
        fetchProductById(id);
    //eslint-disable-next-line
    },[]);

    useEffect(() =>{
        let defaultVariant;
        if(product.title){
            for(let j=0; j < product.options.length; j++){
                if(j === 0){
                    defaultVariant = product.options[j].values[0].value;
                } else{
                    defaultVariant = defaultVariant + ' / ' +  product.options[j].values[0].value;
                }
            }
            setChosenVariant(defaultVariant)
        }
    },[product])

    if(!product.title){
        return <div>loading...</div>
    } else {
        
        let productOptions = []; 
        for( let i=0; i < product.options.length; i++ ){
            let options = product.options[i].values.map(value => {
                return <option value={value.value}>{value.value}</option>
            })
            productOptions.push(<>
                        <label>{product.options[i].name}</label>
                        <select value={product.options[0].value} onChange={e => updateSelection(i, e.target.value)}>{options}</select>
                    </>)
        }

        const updateSelection = (i, value) => {
            let copyState = [...selections];
            copyState[i] = value;
            setSelections(copyState);
        }

        const findVariantIDAndAddToCart = () =>{
            //If we have made a change from the default, we will need to use that instead
            if(selections.length !== 0){
                let variantTitle = [...chosenVariant];
                for(let i=0; i < selections.length; i++){
                    if(i === 0){
                        variantTitle = selections[i];
                    } else {
                        variantTitle = variantTitle + ' / ' + selections[i]
                    }
                }
                //.FIND() on variants doesn't work; do it manually to find our variant
                for(let j=0; j < product.variants.length; j++){
                    if(product.variants[j].title === variantTitle){
                        addItemsToCheckout(product.variants[j].id, quantity)
                    }
                }
            } else {
                //If we are using our defalt, add this to cart
                for(let j=0; j < product.variants.length; j++){
                    if(product.variants[j].title === chosenVariant){
                        addItemsToCheckout(product.variants[j].id, quantity)
                    }
                }
            }
        }

        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <div className='ProductDetails-Picture' style={{backgroundImage: `URL(${product.images[0].src})`}}></div>
                        </Col>
                        <Col xs={8}>
                            <Row>{product.title}</Row>
                            <Row>{product.description}</Row>
                            <Row>{productOptions}</Row>
                            <Row><label>Quantity</label><input type='number' value={quantity} onChange={e => setQuantity(e.target.value)}/></Row>
                            <Row><Button onClick={() => findVariantIDAndAddToCart()}>Add to Cart</Button></Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProductDetailsPage;
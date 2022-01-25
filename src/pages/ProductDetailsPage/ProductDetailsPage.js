import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Container, Row, Col, Button } from 'react-bootstrap'
import { v4 as uuid } from 'uuid';

import { ShopContext } from '../../Shared/context/shop-context';

import  './ProductDetailsPage.css';

const ProductDetailsPage = props => {

    const { id } = useParams();
    const { fetchProductById, product, addItemsToCheckout } = useContext(ShopContext);
    const [ quantity, setQuantity ] = useState('1');
    const [ selections, setSelections ] = useState([]);
    const [ chosenVariant, setChosenVariant ] = useState();
    const [ localError, setLocalError ] = useState(null);
    const [ price, setPrice ] = useState(null);

    useEffect(() => {
        fetchProductById(id);
    //eslint-disable-next-line
    }, [id]);

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

    const findVariantID = (type) =>{
        if(product.id){
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
                        verifyVariantIsInStock(type, product.variants[j].id, quantity)
                    }
                }
            } else {
                //If we are using our defalt, add this to cart
                for(let j=0; j < product.variants.length; j++){
                    if(product.variants[j].title === chosenVariant){
                        verifyVariantIsInStock(type, product.variants[j].id, quantity)
                    }
                }
            }
        }
    }
    
    const verifyVariantIsInStock = ( type, variantID, quantity ) => {
        for(let i=0; i < product.variants.length; i++){
            if(product.variants[i].id === variantID){
                setPrice(product.variants[i].price)
                if(product.variants[i].available === true){
                    if(type === 'add'){
                        addItemsToCheckout(variantID, quantity)
                    }
                    setLocalError(null)
                } else {
                    setLocalError('Unfortunately, this item is out of stock.')
                }
            }
        }
    }

    useEffect(() => {
        findVariantID()
    })

    if(!product.title){
        return <div className='spinner'><Spinner animation="border" /></div>
    } else {
        let productOptions = []; 
        for( let i=0; i < product.options.length; i++ ){
            let options = product.options[i].values.map(value => {
                return <option key={uuid()} value={value.value}>{value.value}</option>
            })

            productOptions.push(<React.Fragment key={uuid()}>
                            <label>{product.options[i].name}</label>
                            <select value={selections[i]} onChange={e => { updateSelection(i, e.target.value); findVariantID('price') } }>{options}</select>
                        </React.Fragment>)
        }

        const updateSelection = (i, value) => {
            let copyState = [...selections];
            copyState[i] = value;
            setSelections(copyState);
        }


        return (
            <div>
                <Container>
                    { localError && <h1>{ localError } </h1> }
                    <Row>
                        <Col sm={4}>
                            <div className='ProductDetails-Picture' style={{backgroundImage: `URL(${product.images[0].src})`}}></div>
                        </Col>
                        <Col sm={8} className='ProductDetails-Details'>
                            <Row><h2>{product.title} - ${ price } </h2></Row>
                            <Row>{product.description}</Row>
                            <Row>{productOptions}</Row>
                            <Row><label>Quantity</label><input type='number' value={quantity} onChange={e => setQuantity(e.target.value)}/></Row>
                            <Row><br /></Row>
                            <Row><Button onClick={() => findVariantID('add')}>Add to Cart</Button></Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProductDetailsPage;
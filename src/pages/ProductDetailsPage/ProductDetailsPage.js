import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Container, Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { v4 as uuid } from 'uuid';

import RecipeReviews from '../RecipeDetailsPage/RecipeReviews/RecipeReviews';

import { ShopContext } from '../../Shared/context/shop-context';
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import  './ProductDetailsPage.css';

const ProductDetailsPage = props => {

    const { id } = useParams();
    
    const { fetchProductById, product, addItemsToCheckout } = useContext(ShopContext);
    const { userState } = useContext(AuthContext);

    const [ quantity, setQuantity ] = useState('1');
    const [ selections, setSelections ] = useState([]);
    const [ chosenVariant, setChosenVariant ] = useState();
    const [ localError, setLocalError ] = useState(null);
    const [ price, setPrice ] = useState(null);
    const [ comparePrice, setComparePrice ] = useState(null);
    const [ productReviews, setProductReviews ] = useState(null);
    const [ canSubmitReview, setCanSubmitReview ] = useState(true);
    const [ refreshPage, setRefreshpage ] = useState(false);

    const { sendRequest } = useHttp();

    //Get the product for our page; must be done first
    useEffect(() => {
        fetchProductById(id);
    //eslint-disable-next-line
    }, [id, refreshPage]);

    useEffect(()=>{
        //Get our reviews 
        const getFromServer = async() => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'shop/getReviewsForProduct/' + id);
                setProductReviews(responseData);
                //If we return undefined, then this product does not exist in our DB; so if the user is also an admin, create one
                if(responseData === undefined && userState.isAdmin){
                    await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'shop/submitANewProduct/', 'POST', 'include', { Authorization: `Bearer ${userState.token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}, JSON.stringify({shopifyId: id, rating: 0}));
                    setRefreshpage(prevState => !prevState);
                }
            } catch(err){
                //Errors handled in hook
            }
        }
        getFromServer();
    //eslint-disable-next-line
    }, [id, refreshPage])

    //Determine what our default variant is; This will end up being the first variant available, which is
    // made up of the first choice for every option. We will need to build the variant ourselves.
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
            setSelections(product.variants[0].title.split(' / '));
        }
    },[product])

    //Based off of the selections in our state, find the variantID; once found, check to ensure that item is in stock
    const findVariantID = (type) =>{
        if(product.id){
            //If we have made a change from the default, we will need to use that instead
            if(selections.length !== 0){
                let variantTitle;
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
    
    //Ensure that variant is in stock; If it is, add it to cart. Otherwise, alert the user.
    const verifyVariantIsInStock = ( type, variantID, quantity ) => {
        for(let i=0; i < product.variants.length; i++){
            if(product.variants[i].id === variantID){
                setPrice(product.variants[i].price)
                setComparePrice(product.variants[i].compareAtPrice)
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

    //Get the variant ID ready when we load in.
    useEffect(() => {
        findVariantID();
    })

    //Check if we have loaded in our product or not; Show a spinner until we have.
    if(!product.title){
        return <div className='spinner'><Spinner animation="border" /></div>
    } else {
        //Create an array of our options
        let productOptions = []; 
        for( let i=0; i < product.options.length; i++ ){
            //Iterate over each option to get the values needded for that option
            let options = product.options[i].values.map(value => {
                return <option key={uuid()} value={value.value}>{value.value}</option>
            })

            //Using the options we found above, create our select dropdown utilizing them. Then, push the finished option dropdown into productOptions
            productOptions.push(<InputGroup key={uuid()} className='OptionGrouping'>
                            <InputGroup.Text>{product.options[i].name}</InputGroup.Text>
                            <Form.Select value={selections[i]} onChange={e => { updateSelection(i, e.target.value); findVariantID('price') } }>{options}</Form.Select>
                        </InputGroup>)
        }

        //Update our selection when a user selects something new
        const updateSelection = (i, value) => {
            let copyState = [...selections];
            copyState[i] = value;
            setSelections(copyState);
        }

        //Show our price; determine if there is a compare at price or not and decide what to show based off that.
        let showPrice, sale;
        if(price === comparePrice || comparePrice === null){
            showPrice = <> ${ price } </>
        } else {
            sale = true;
            showPrice = <><strike style={{color: 'grey', marginRight: '10px'}}> ${ price } </strike> ${ comparePrice } </>
        }

        return (
            <Container className='ProductDetails'>
                { localError && <h1>{ localError } </h1> }
                <Row>
                    <Col s={12} className='d-flex justify-content-center align-items-center'>
                        <div className='ProductDetails-Picture' style={{backgroundImage: `URL(${product.images[0].src})`}}>
                        { sale && <div className='sale' style={{marginTop: '10px', marginRight: '10px'}}>Sale</div> }
                        </div>
                    </Col>
                    <Col s={12} className='ProductDetails-Details'>
                        <h2>{product.title} - { showPrice }</h2>
                        {product.description}
                        <div className='Options'>
                            <h5>Options</h5>
                            {productOptions}
                        </div>
                        <div className='Quantity'>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Quantity</InputGroup.Text>
                                <FormControl placeholder="Quantity" aria-label="Quantity" type='number'
                                    value={quantity} onChange={e => setQuantity(e.target.value)} />
                            </InputGroup>
                        </div>
                        <Button onClick={() => findVariantID('add')}>Add to Cart</Button>
                    </Col>
                </Row>
                <Row>
                    {productReviews && <RecipeReviews isProduct={true} id={id} canSubmitReview={canSubmitReview} setCanSubmitReview={setCanSubmitReview} 
                        loadedRecipe={productReviews} userState={userState} setRefreshpage={setRefreshpage} 
                    /> }
                </Row>
            </Container>
        )
    }
}

export default ProductDetailsPage;
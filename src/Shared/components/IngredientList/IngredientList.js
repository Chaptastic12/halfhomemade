import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { v4 as uuid } from 'uuid';

import './IngredientList.css';

const IngredientList = props =>{

    let ingredientArray = props.ingredients.split(/\r|\n/);

    const ingList = ingredientArray.map(ing => {
        let key = uuid();
        return( <Col xs='auto' key={key} className='IngredientList-Ingredients'>
                    <div>{ing}</div>
                </Col>)
    })
    
    return <div className='IngredientList text-center'>
        <div className='RecipePageDetails-Header'>
            {props.show && <h1><hr className='hr' style={{float: 'left' }}/>Ingredients<hr className='hr' style={{float: 'right' }}/></h1> }
        </div>
        <Row className='d-flex justify-content-center align-items-center'>{ingList}</Row>
    </div>
    
    /* OLD CODE - We no longer uitlize an array, preserving for now.
    const ingList = props.ingredients.map(ing => {
        let key = ing.id+ing.value;
        return( <Col xs='auto' key={key} className='IngredientList-Ingredients'>
                    <div>{ing.value}</div>
                </Col>)
    })
    
    return <div className='IngredientList text-center'>
        <h1><hr className='hr' style={{float: 'left' }}/>Ingredients<hr className='hr' style={{float: 'right' }}/></h1>
        <Row className='d-flex justify-content-center align-items-center'>{ingList}</Row>
    </div>
    */
}

export default IngredientList;
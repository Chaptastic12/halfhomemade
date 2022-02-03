import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { v4 as uuid } from 'uuid';

import './RecipeIngredientList.css';

const RecipeIngredientList = props =>{

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
}

export default RecipeIngredientList;
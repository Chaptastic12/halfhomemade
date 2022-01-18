import React from 'react';

import { Row, Col } from 'react-bootstrap';

import './IngredientList.css';

const IngredientList = props =>{
  
    const ingredientList = props.ingredients.map(ingredient => {
        let key = ingredient.id+ingredient.value;
        return (<li key={key}>
                    {ingredient.value}
                </li>)
    })

    const newList = props.ingredients.map(ing => {
        let key = ing.id+ing.value;
        return( <Col xs='auto' key={key} className='IngredientList-Ingredients'>
                    <div>{ing.value}</div>
                </Col>)
    })
    
    if(props.new){
        return <div className='IngredientList text-center'>
            <h1><hr className='hr' style={{float: 'left' }}/>Ingredients<hr className='hr' style={{float: 'right' }}/></h1>
            <Row className='d-flex justify-content-center align-items-center'>{newList}</Row>
        </div>
    }

    return(
        <div className='IngredientList'>
            <h1><hr className='hr'/>Ingredients<hr className='hr'/></h1>
            <ol>{ingredientList}</ol>
        </div>
    )
}

export default IngredientList;
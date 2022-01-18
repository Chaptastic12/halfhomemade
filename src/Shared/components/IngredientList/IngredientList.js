import React from 'react';

import { Row, Col } from 'react-bootstrap';

import './IngredientList.css';

const IngredientList = props =>{


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

}

export default IngredientList;
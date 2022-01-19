import React from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import FormattedSteps from './FormattedSteps/FormattedSteps';

import './RecipeDetails.css';

const RecipeDetails = props =>{
    let steps = props.details;

    let formattedSteps = steps.map(step =>{
        return <FormattedSteps key={uuid()} step={step.id} instructions={step.value} />
    })

    return <div className='RecipeDetails'>
        <h1 className='RecipeDetails-header text-center'><hr className='hr' style={{float: 'left' }}/>Instructions<hr className='hr' style={{float: 'right' }}/></h1>
        <div className='RecipeDetails-Steps '>
            {formattedSteps}
        </div>
    </div>

}

export default RecipeDetails;
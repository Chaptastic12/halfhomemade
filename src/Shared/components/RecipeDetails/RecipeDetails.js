import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

import FormattedSteps from './FormattedSteps/FormattedSteps';

import './RecipeDetails.css';

const RecipeDetails = props =>{

    let steps = props.details.steps;

    let formattedSteps = steps.map(step =>{
        return <FormattedSteps step={step.step} instructions={step.instructions} />
    })

    return(
        <Container>
            <Row className='RecipeDetails'>
                <Col xs={12}>
                    <div className='RecipeDetails-Image' style={{backgroundImage: 'URL('+props.details.foodImage+')'}} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 className='RecipeDetails-header text-center'>Instructions</h1>
                    <div className='RecipeDetails-Steps '>
                        {formattedSteps}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default RecipeDetails;
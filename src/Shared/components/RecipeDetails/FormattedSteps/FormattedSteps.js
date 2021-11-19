import React from 'react';

import './FormattedSteps.css';

const FormattedSteps = props =>{

    return(
        <div className='FormattedSteps'>
            <div className='FormattedSteps-StepNumber'>{props.step}</div>
            <div className='FormattedSteps-Instructions'>{props.instructions}</div>
        </div>
    )
}

export default FormattedSteps;
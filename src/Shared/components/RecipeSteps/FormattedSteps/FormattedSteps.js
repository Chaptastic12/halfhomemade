import React from 'react';

import './FormattedSteps.css';

const FormattedSteps = props =>{

    return(
        <div className='FormattedSteps'>
            <div className='Instructions'>{props.instructions}</div>
        </div>
    )
}

export default FormattedSteps;
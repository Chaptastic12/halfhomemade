import React from 'react';

import './EducationDiv.css';

const EducationDiv = props =>{

    return(
        <>
            <div className='EducationDiv d-flex justify-content-center'>
                <div className='text-center'>
                    <h1 className='EducationDiv-Title'>Learn with us</h1>
                    <p>Want to follow along? Use our educational videos and we'll work with you, step by step, together.</p>
                    <p className='BookDiv-LearnMore'>Watch a video <i className="far fa-arrow-alt-circle-right" /></p>
                </div>
            </div>
            <div className='Section-Divider' />
        </>
    )
}

export default EducationDiv;
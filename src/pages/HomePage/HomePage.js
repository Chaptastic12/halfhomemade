import React from 'react';

import BookDiv from '../../Shared/components/BookDiv/BookDiv';
import AboutDiv from '../../Shared/components/AboutDiv/AboutDiv';
import EducationDiv from '../../Shared/components/EducationDiv/EducationDiv';

const HomePage = props =>{

    return(<>
            <BookDiv/>
            <div className='Section-Divider' />
            <EducationDiv />
            <div className='Section-Divider' />
            <AboutDiv/>
            <div className='Section-Divider' />
        </>);
}

export default HomePage;
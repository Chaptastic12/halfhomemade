import React from 'react';

import BookDiv from '../../Shared/components/BookDiv/BookDiv';
import AboutDiv from '../../Shared/components/AboutDiv/AboutDiv';
import EducationDiv from '../../Shared/components/EducationDiv/EducationDiv';

const HomePage = props =>{

    return(<>
            <BookDiv/>
            <AboutDiv/>
            <EducationDiv />
        </>);
}

export default HomePage;
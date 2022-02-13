import React from 'react';

import BookDiv from './BookDiv/BookDiv';
import AboutDiv from './AboutDiv/AboutDiv';
import EducationDiv from './EducationDiv/EducationDiv';
import RecipeReviews from './RecipeReviews/RecipeReviews';

const HomePage = props =>{

    return(<>
            <BookDiv/>
            <div className='Section-Divider' />
            <EducationDiv />
            <div className='Section-Divider' />
            <AboutDiv/>
            <div className='Section-Divider' />
            <RecipeReviews />
            <div className='Section-Divider' />
        </>);
}

export default HomePage;
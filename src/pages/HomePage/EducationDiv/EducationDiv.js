import React from 'react';

import FlippingTextIcon from '../../../Shared/components/UI Elements/FlippingTextIcon/FlippingTextIcon';
import useProgressiveImage from '../../../Shared/hooks/lazyLoad-hook';

import classroom from '../../../Shared/Img/Food/classroomCooking.jpg';
import computer from '../../../Shared/Img/Food/cookingComputer.jpg';
import './EducationDiv.css';

const EducationDiv = props =>{

    const loadedClassroom = useProgressiveImage(classroom);
    const loadedComputer = useProgressiveImage(computer)

    const educationItems = [
        { icon: <img className='Image' src={loadedClassroom} alt='Classroom setting'/>, subTitle: 'Learn when best for you', desc: `Tune into live classes and ask questions on the fly! For those who can't make it, recordings are saved and made available on our YouTube channel.`, iconLeft: true },
        { icon: <img className='Image' src={loadedComputer} alt='Learn on your computer'/>, subTitle: `Videos at your fingertips`, desc: `Trying one of our recipes? Follow along from your book, and along side our experienced chef! Everything is explained for even the most novice of chefs.`, iconLeft: false },
        { icon: <i className="fas fa-piggy-bank icon" />, subTitle: `Best of yet...`, desc: `All of this is provided to you - free of charge. If you want a hardcopy of our recipes though, you are more than welcome to add our book to your collection.`, iconLeft: true }
    ]

    return(
        <div className='EducationDiv'>
            <div className='Content'>
                <h1 className='Title'>Learn with us</h1>
                <FlippingTextIcon items={educationItems} />
                <br />
            </div>
        </div>
    )
}

export default EducationDiv;
import React from 'react';

import cookingTogether from '../../Shared/Img/Food/cookingTogether.jpg'
import friendsCooking from '../../Shared/Img/Food/friendsCooking.jpg'
import cookingOutside from '../../Shared/Img/Food/cookingOutside.jpg'

import FlippingTextIcon from '../../Shared/components/UI Elements/FlippingTextIcon/FlippingTextIcon';
import useProgressiveImage from '../../Shared/hooks/lazyLoad-hook';

import './AboutPage.css';

const AboutPage = props => {

    const loadedTogether = useProgressiveImage(cookingTogether)
    const loadedFriends = useProgressiveImage(friendsCooking);
    const loadedOutside = useProgressiveImage(cookingOutside);

    const aboutItems = [
        { icon: <img className='Image' src={loadedFriends} alt='Cooking with Friends' />, subTitle: 'Made by friends, for friends', desc: `What started as something to try eventually steam rolled into weekly events. Seeing the joy that on everyones face when they take that first bite is unforgettable.`, iconLeft: true },
        { icon: <img className='Image' src={loadedTogether} alt='Cooking together' />, subTitle: 'Slowly but surely...', desc: `Slowly but surely, we were able to branch out and try new recipes. Starting as a one man show, eventually we had friends asking us to teach them how it's done`, iconLeft: false },
        { icon: <img className='Image' src={loadedOutside} alt='Cooking outside' />, subTitle: 'And the rest, is history', desc: `From the joy of teaching others and enabling them to be more confident cooks comes Half-Homemade. We are excited to see you on our journey!`, iconLeft: true }
    ]

    return (
        <div className='AboutPage'>
            <div id='about' className='Header'>
                <div id='about' className='Title'>
                    About us
                </div>
                <div className='Quote'>
                    "I get to touch people's lives with what I do... I want to share this with you." <br />
                    <span>-Jon Favreau</span>
                </div>
            </div>
            <div className='Main'>
                <div className='Content'>
                    <div className='Blurb'>
                        Nothing is better than a home cooked meal. Whether it's weekly curry or a delicious holiday ham, it's always wonderful to share food with friends and family. 
                        In this book, you'll find recipes to help you do just that. Some are simple, others are harder, and sometimes we take shortcuts; but all of them are great tasting! 
                        Share love and cook tasty food. <br/><span className='Itadaki'>Itadakimasu!</span>
                    </div>
                </div>
                <FlippingTextIcon items={aboutItems} />
                <div id='methodology'>
                    <h1>Our Methodology</h1>
                    <p>Methodology Words</p>
                </div>
                <div id='promise'>
                    <h1>Our Promise</h1>
                    <p>Promise Words</p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
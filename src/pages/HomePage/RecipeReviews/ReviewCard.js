import React from 'react';

import { NavLink } from 'react-router-dom';

import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

import Stars from '../../../Shared/components/UI Elements/Stars/Stars';

import './ReviewCard.css';

const ReviewCard = props =>{

    const { review, recipe } = props.data;

    return (
      <div className="ReviewCard cust-shadow-sm">
        <NavLink to={`/recipes/view/${recipe.id}`}>
          <i className="far fa-user" /> <br />
          {recipe.title} <br />
          <Stars item={review.rating} /> <br />
          <div style={{ width: "250px" }}>
            <small>
              <FaQuoteLeft />
              <span style={{marginLeft: 5, marginRight: 5}}>{review.text}</span>
              <FaQuoteRight />
            </small>
          </div>
        </NavLink>
      </div>
    );
}

export default ReviewCard;
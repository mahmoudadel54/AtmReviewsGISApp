import React, { useState } from 'react';
import Star from './starComponent';

const RatingStars = (props) => {
    const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    const activeStar = {
        fill: 'yellow'
    };

    const changeGradeIndex = ( index ) => {
        props.setData({...props.data, rating:parseInt(index)+1});
    }

    return (
        <div className="container">
            <h1 className="result">{ GRADES[props.data.rating-1] ? GRADES[props.data.rating-1] : 'You didn\'t review yet'}</h1>
            <div className="stars">
                {
                    GRADES.map((grade, index) => (
                        <Star 
                            index={index} 
                            key={grade} 
                            changeGradeIndex={changeGradeIndex}
                            style={ (props.data.rating-1) >= index ? activeStar : {}}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default RatingStars;
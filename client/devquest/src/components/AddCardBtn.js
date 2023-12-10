import React from 'react';
import './AddCard.css';
import { Link } from 'react-router-dom';

export default function AddCardBtn() {
    return (
        <div className='project-card-add'>
            <div className='card-image-add'></div>
            <h2 className='card-h2-add'>Add Projects!</h2>
            <div className='addCardDiv'>
                <button className='addCardLink'><Link to={'/projects/add'}>+</Link></button>
            </div>
        </div>
    )
}

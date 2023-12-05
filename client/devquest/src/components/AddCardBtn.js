import React from 'react';
import './AddCard.css';
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function AddCardBtn() {
    return (
        <div className='project-card-add'>
            <div className='card-image-add'></div>
            <h1 className='card-h1-add'></h1>
            <div className='addCardDiv'>
                <button className='addCardLink'><Link to={'/projects/add'}>+</Link></button>
            </div>
        </div>
    )
}

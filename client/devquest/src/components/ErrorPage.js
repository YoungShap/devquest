import React from 'react'
import './ErrorPage.css'
import { BiSolidErrorAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='my-error-page'>
        <BiSolidErrorAlt className='warning-icon' size={80} color='red'/>
        <p><b>ERROR 404 , </b> Oops! Wrong Page.</p>
       <Link to={'/'}> <button className='goHome'>Go Back Home</button></Link>
    </div>
  )
}

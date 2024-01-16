import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../App';
import './CardExpand.css'

export default function CardExpand() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [oneCard, setOneCard] = useState({
    name: '',
    category: '',
    dev: '',
    imgSrc: '',
  });
  const { setIsLoading, snackbar } = useContext(GeneralContext);

  useEffect(() => {
    // setIsLoading(true);
    fetch(`http://localhost:4000/projects/${id}`, {
      credentials: 'include',
      headers: {
        'Authorization': localStorage.token
    },
    })
      .then(res => res.json())
      .then(data => {
        setOneCard(data);
      })
      .catch(() => {
        snackbar("No Card Availible");
        navigate('/error');
      })
      .finally(() => {
        // setIsLoading(false);
      })
  }, [])

  return (
    <div className='one-card-frame'>
      <div className='one-card'>
        <div className='landing-page'>
          <div className='image-container'>
            <img src={`http://localhost:4000/uploads/${oneCard.imgSrc}`} alt={oneCard.name} />
          </div>
        </div>
        <h1>{oneCard.name}</h1>
        <div className='card-content'>
          <p><b>Category:</b> {oneCard.category}</p>
          <p><b>Developer:</b> {oneCard.dev}</p>
          <p><b>Card ID:</b> {oneCard._id}</p>
          <h2><b>About:</b></h2>
        </div>
      </div>
    </div>
  );
}


import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../App';
import './CardExpand.css'
import { BiLogoMongodb } from 'react-icons/bi';
import { SiExpress, SiHtml5, SiPython } from 'react-icons/si';
import { FaAngular, FaNodeJs, FaReact } from 'react-icons/fa';
import { DiRuby } from 'react-icons/di';
import { RiJavascriptFill } from 'react-icons/ri';
import { TbFileTypePhp } from 'react-icons/tb';
import { IoLogoCss3 } from 'react-icons/io';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function CardExpand() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [oneCard, setOneCard] = useState({
    name: '',
    category: '',
    dev: '',
    imgSrc: '',
  });
  const { snackbar, setIsLoading } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:4000/projects/expand/${id}`, {
      credentials: 'include',
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
        setIsLoading(false);
      })
  }, [])

  return (
    <div className='one-card-frame'>
      <div className='one-card'>
        <div className='landing-page'>
          <div className='image-container'>
            { oneCard.imgSrc ?
            <img src={`http://localhost:4000/uploads/${oneCard.imgSrc}`} alt={oneCard.name} />
            : ''
          }
          </div>
        </div>
        <h1>{oneCard.name}</h1>
        <div className='learn-icons'>
      {oneCard.category === 'Mern' && (
        <>
          <BiLogoMongodb size={30} style={{ color: "green" }} />
          <SiExpress size={30} style={{ color: "#7d8000" }} />
          <FaReact size={30} style={{ color: "teal" }} />
          <FaNodeJs size={30} style={{ color: "green" }} />
        </>
      )}

      {oneCard.category === 'Mean' && (
        <>
          <BiLogoMongodb size={30} style={{ color: "green" }} />
          <SiExpress size={30} style={{ color: "#7d8000" }} />
          <FaAngular size={30} style={{ color: "#870f0f" }} />
          <FaNodeJs size={30} style={{ color: "green" }} />
        </>
      )}

      {oneCard.category === 'Ruby' && (
        <DiRuby size={28} style={{ color: "#870f0f", padding: "7px" }} />
      )}

      {oneCard.category === 'React' && (
        <FaReact size={30} style={{ color: "teal" }} />
      )}

      {oneCard.category === 'Angular' && (
        <FaAngular size={30} style={{ color: "#870f0f" }} />
      )}

      {oneCard.category === 'JS' && (
        <RiJavascriptFill size={30} style={{ color: "#b3b31a" }} />
      )}

      {oneCard.category === 'Python' && (
        <SiPython size={28} style={{ color: "#0093ff" }} />
      )}

      {oneCard.category === 'PhP' && (
        <TbFileTypePhp size={32} style={{ color: "#be8cff" }} />
      )}

      {oneCard.category === 'HTMLCSS' && (
        <>
          <SiHtml5 size={30} style={{ color: "#cb6d07" }} />
          <IoLogoCss3 size={31} style={{ color: "#318cc3" }} />
        </>
      )}
    </div>
        <div className='card-content'>
          <p><b>Category:</b> {oneCard.category}</p>
          <p><b>Developer:</b> {oneCard.dev}</p>
          <h2><b>About:</b></h2>
          <p className='description-p'>{oneCard.description}</p>
          <Link to={oneCard.ghub} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '40px', backgroundColor: 'black', borderRadius: '50%', padding: "0", marginTop: "20px" }} /></Link>
        </div>
      </div>
    </div>
  );
}


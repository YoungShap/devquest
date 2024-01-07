import React from 'react'
import '../components/About.css'
import '../components/AboutIcons.css'
import '../categories/Categories.css'
import '../components/Home.css'
import '../components/Cards.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import { GiStoneStack } from 'react-icons/gi'
import { GrStackOverflow } from 'react-icons/gr'
import { DiRuby } from 'react-icons/di'
import { FaAngular, FaReact } from 'react-icons/fa'
import { RiJavascriptFill } from 'react-icons/ri'
import { SiHtml5, SiPython } from 'react-icons/si'
import { TbFileTypePhp } from 'react-icons/tb'
import { IoLogoCss3 } from 'react-icons/io'
import { Link } from 'react-router-dom'
import WebhookIcon from '@mui/icons-material/Webhook';
import { BsFillHeartFill, BsFillTrash3Fill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

export default function About() {

    return (
        <div className='main-container'>
            <div className='MyTitle'>
                <h1 className='about-h1'>DevQuest<WebhookIcon sx={{ fontSize: '38px', marginTop: "4px" }} /></h1>
                <p style={{marginTop:"5px"}} >Welcome to DevQuest, your ultimate destination for mastering the art of web development!</p>
                <br></br>
                <div className='learn-icons-about'>
                    <Link to={'/projects/mern'}><GiStoneStack style={{ color: "#69a8d7" }} /></Link>
                    <Link to={'/projects/mean'}> <GrStackOverflow style={{ color: "#50c770" }} /></Link>
                    <Link to={'/projects/ruby'}><DiRuby style={{ color: "#870f0f" }} /></Link>
                    <Link to={'/projects/react'}> <FaReact style={{ color: "teal" }} /></Link>
                    <Link to={'/projects/angular'}><FaAngular style={{ color: "#870f0f" }} /></Link>
                    <Link to={'/projects/js'}> <RiJavascriptFill style={{ color: "#b3b31a" }} /></Link>
                    <Link to={'/projects/python'}> <SiPython style={{ color: "#0093ff" }} /></Link>
                    <Link to={'/projects/php'}> <TbFileTypePhp style={{ color: "#be8cff" }} /></Link>
                    <Link to={'/projects/htmlcss'}> <SiHtml5 style={{ color: "#cb6d07" }} /></Link>
                    <Link to={'/projects/htmlcss'}>  <IoLogoCss3 style={{ color: "#318cc3" }} /></Link>
                </div><br></br>
            </div>
            <>
                <h1 className='about-heading'>Explore and Learn</h1>
                <p className='about-p'>Each Category contains a set of Cards like this</p>
            </>
            <div className='card-frame' style={{ marginTop: "-2px" }}>
                <div className='project-card'>
                    <div className='card-image about'></div>
                    <h1 className='card-h1'>Business Cards App</h1>
                    <div className='my-p'>
                        <p><b>Category : Mern </b></p>
                        <p><b>Dev Name : YoungShap</b></p>
                        <div className='card-icons'>
                            <GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%', padding: "0px", marginTop: "5px" }} />
                            <div className='spacer'></div>
                            <div className='user-icons-about'>
                                <BsFillTrash3Fill className='Trash' size={26} style={{ color: 'white' }} />
                                <span className='Edit-about'><FiEdit size={26} /></span>
                                <BsFillHeartFill className='Heart' size={26} style={{ color: 'red' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <h1 className='about-heading'>User Guide :</h1>
                <div className='about-p'>
                    <ul className='about-ul'>
                        <li><b>Each Card shows :</b><br></br> A Screenshot of the Project, the Developer's Github username AND a link to that same Project's Github Repository </li><br></br>
                        <li><b>Right next to the Github Button there are : </b><br></br>Delete and Edit Buttons and they will be displayed depending on if you uploaded the Project or not.</li><br></br>
                        <li><b>Favorites :</b><br></br> The Heart Icon is how you Add/Remove a project from your Favorites Tab, you will need to SignUp to use this Feature. </li><br></br>
                        <li><b>Info Buttons : </b><br></br> Each Category has its own Buttons leading you to informational websites like W3schools, CodeCademy and More.</li>
                    </ul>
                </div>
            </>
            <>
                <h1 className='about-heading'>Sign Up Today :</h1>
                <div className='about-p'>
                    <ul className='about-ul' style={{fontFamily:"math"}}>
                        <li><b>Add : </b> Your own Projects </li><br></br>
                        <li><b>Favorite : </b>Keep track of your favorite Projects in the Favorites Tab</li><br></br>
                        <li><b>Edit : </b> Your Porjects on Command</li><br></br>
                        <li><b>Contribute : </b> To our growing Community and add more Project ideas for Others!</li>
                    </ul>
                </div>
            </>
        </div>
    )
}

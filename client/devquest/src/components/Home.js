import React from 'react'
import '../components/Home.css'
import '../components/Cards.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import { FaReact } from 'react-icons/fa';
import { GiStoneStack } from 'react-icons/gi';
import { GrStackOverflow } from 'react-icons/gr';
import { BsFiletypePhp } from 'react-icons/bs';
import { SiAngular, SiJavascript, SiHtml5 } from 'react-icons/si';
import { IoLogoPython } from 'react-icons/io';
import { DiRuby } from 'react-icons/di';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='main-container'>
            <div className='MyTitle'>
                <h1>Welcome to DevQuest!</h1>
                <p>Here are some of our favorite projects from all Categories</p>
            </div>
            <div className='card-frame'>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/Social.png')})` }}></div>
                    <h1 className='card-h1'>Social Media App</h1>
                    <div className='my-p'>
                        <p><b>Category : MERN Stack</b></p>
                        <p><b>Dev Name : Ed-Roh</b></p>
                        <div className='card-icons'>
                            <a target="_blank" href='https://github.com/ed-roh/mern-social-media' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                            <Link to={'projects/mern'}><GiStoneStack style={{ color: '#69a8d7', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></Link>
                        </div>
                    </div>
                </div>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/task.png')})` }}></div>
                    <h1 className='card-h1'>Task Manager</h1>
                    <div className='my-p'>
                        <p><b>Category : MEAN Stack</b></p>
                        <p><b>Dev Name : DevStackr</b></p>
                        <div className='card-icons'>
                            <a target="_blank" href='https://github.com/Devstackr/task-manager-mean-stack/tree/master' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                            <Link to={'projects/mean'}><GrStackOverflow style={{ color: '#50c770', fontSize: '34px', backgroundColor: 'black', borderRadius: '50%' }} /></Link>
                        </div>
                    </div>
                </div>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/friends.png')})` }}></div>
                    <h1 className='card-h1'>Friends List App</h1>
                    <div className='my-p'>
                        <p><b>Category : Ruby On Rails</b></p>
                        <p><b>Dev Name : FlatPlanet</b></p>
                        <div className='card-icons'>
                            <a target="_blank" href='https://github.com/flatplanet/railsfriends' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                            <Link to={'projects/ruby'}><DiRuby style={{ color: '#c12727ed', fontSize: '36px', borderRadius: '50%' }} /></Link>
                        </div>
                    </div>
                </div>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/myP.png')})` }}></div>
                    <h1 className='card-h1'>Business Cards App</h1>
                    <div className='my-p'>
                        <p><b>Category : React</b></p>
                        <p><b>Dev Name : YoungShap</b></p>
                    </div>
                    <div className='card-icons'>
                        <a target="_blank" href='https://github.com/YoungShap/AvivShapiraProject/tree/master/ReactProject/bcard' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                        <Link to={'projects/react'}><FaReact style={{ color: 'teal', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></Link>
                    </div>
                </div>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/food.png')})` }}></div>
                    <h1 className='card-h1'>Food Store</h1>
                    <div className='my-p'>
                        <p><b>Category : Angular</b></p>
                        <p><b>Dev Name : NasirJd</b></p>
                        <div className='card-icons'>
                            <a target="_blank" href='https://github.com/nasirjd/foodmine-course' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                            <Link to={'projects/angular'}><SiAngular style={{ color: '#c33f3f', fontSize: '36px', borderRadius: '50%' }} /></Link>
                        </div>
                    </div>
                </div>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/snake.png')})` }}></div>
                    <h1 className='card-h1'>Snake Game</h1>
                    <div className='my-p'>
                        <p><b>Category : JavaScript</b></p>
                        <p><b>Dev Name : ImKennyYip</b></p>
                        <div className='card-icons'>
                            <a target="_blank" href='https://github.com/ImKennyYip/snake' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                            <Link to={'projects/js'}><SiJavascript style={{ color: '#fbc700', fontSize: '36px', borderRadius: '10px' }} /></Link>
                        </div>
                    </div>
                </div>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/pong.png')})` }}></div>
                    <h1 className='card-h1'>Pong Game</h1>
                    <div className='my-p'>
                        <p><b>Category : Python</b></p>
                        <p><b>Dev Name : TechWithTim</b></p>
                        <div className='card-icons'>
                            <a target="_blank" href='https://github.com/techwithtim/Pong-Python' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                            <Link to={'projects/python'}><IoLogoPython style={{ color: '#ddd01e', fontSize: '36px', borderRadius: '50%', backgroundColor: '#000000' }} /></Link>
                        </div>
                    </div>
                </div>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/school.png')})` }}></div>
                    <h1 className='card-h1'>School System</h1>
                    <div className='my-p'>
                        <p><b>Category : PhP</b></p>
                        <p><b>Dev Name : TechWithTim</b></p>
                        <div className='card-icons'>
                            <a target="_blank" href='https://github.com/codingWithElias/school-management-system-php' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                            <Link to={'projects/php'}><BsFiletypePhp style={{ color: '#be8cff', fontSize: '37px' }} /></Link>
                        </div>
                    </div>
                </div>
                <div className='project-card'>
                    <div className='card-image' style={{ backgroundImage: `url(${require('../assets/Design.png')})` }}></div>
                    <h1 className='card-h1'>Landing Page</h1>
                    <div className='my-p'>
                        <p><b>Category : HTML&CSS</b></p>
                        <p><b>Dev Name : ShaifArfan</b></p>
                        <div className='card-icons'>
                            <a target="_blank" href='https://github.com/ShaifArfan/one-page-website-html-css-project' ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></a>
                            <Link to={'projects/htmlcss'}><SiHtml5 style={{ color: '#cb6d07', fontSize: '34px' }} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

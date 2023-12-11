import React, { useEffect, useState } from 'react'
import '../components/Home.css'
import '../components/Cards.css'
import '../categories/Categories.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import { FaAngular, FaNodeJs, FaReact } from 'react-icons/fa';
import { GiStoneStack } from 'react-icons/gi';
import { GrStackOverflow } from 'react-icons/gr';
import { SiHtml5, SiPython } from 'react-icons/si';
import { IoLogoCss3, IoLogoPython, IoMdHome } from 'react-icons/io';
import { DiRuby } from 'react-icons/di';
import { Link } from 'react-router-dom';
import { RiJavascriptFill } from 'react-icons/ri';
import { TbFileTypePhp } from 'react-icons/tb';
import { GeneralContext } from '../App';

export default function Home() {
    const { toggleHomePage, roleType } = React.useContext(GeneralContext);
    const [homeProjects, setHomeProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/projects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const updatedHomeProjects = data.filter(p => p.homePage === true);
                setHomeProjects(updatedHomeProjects);
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    }, [toggleHomePage]);

    return (
        <div className='main-container'>
            <div className='MyTitle'>
                <h1>Welcome to DevQuest!</h1>
                <p>Here are some projects from all <b>Categories:</b></p>
                <div className='learn-icons-fav'>
                    <Link to={'projects/mern'}><GiStoneStack style={{ color: "#69a8d7" }} /></Link>
                    <Link to={'projects/mean'}> <GrStackOverflow style={{ color: "#50c770" }} /></Link>
                    <Link to={'projects/ruby'}><DiRuby style={{ color: "#870f0f" }} /></Link>
                    <Link to={'projects/react'}> <FaReact style={{ color: "teal" }} /></Link>
                    <Link to={'projects/angular'}><FaAngular style={{ color: "#870f0f" }} /></Link>
                    <Link to={'projects/js'}> <RiJavascriptFill style={{ color: "#b3b31a" }} /></Link>
                    <Link to={'projects/python'}> <SiPython style={{ color: "#0093ff" }} /></Link>
                    <Link to={'projects/php'}> <TbFileTypePhp style={{ color: "#be8cff" }} /></Link>
                    <Link to={'projects/htmlcss'}> <SiHtml5 style={{ color: "#cb6d07" }} /></Link>
                    <Link to={'projects/htmlcss'}>  <IoLogoCss3 style={{ color: "#318cc3" }} /></Link>
                </div>
            </div>
            <div className='card-frame'>
                {
                    homeProjects.map(p => (
                        <div className='project-card' key={p._id}>
                            <div className='card-image' style={{ backgroundImage: `url(http://localhost:4000/uploads/${p.imgSrc})` }}></div>
                            <h1 className='card-h1'>{p.name}</h1>
                            <div className='my-p'>
                                <p><b>Category : {p.category}</b></p>
                                <p><b>Dev Name : {p.dev}</b></p>
                                <div className='card-icons'>
                                    <Link to={p.ghub} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></Link>
                                    {/* Conditional rendering for category links */}
                                    {p.category === 'Mern' && <Link to={'projects/mern'}><GiStoneStack style={{ color: "#69a8d7", fontSize: '36px' }} /></Link>}
                                    {p.category === 'Mean' && <Link to={'projects/mean'}> <GrStackOverflow style={{ color: "#50c770", fontSize: '34px' }} /></Link>}
                                    {p.category === 'Ruby' && <Link to={'projects/ruby'}><DiRuby style={{ color: "#870f0f", fontSize: '36px' }} /></Link>}
                                    {p.category === 'React' && <Link to={'projects/react'}> <FaReact style={{ color: "teal", fontSize: '36px' }} /></Link>}
                                    {p.category === 'Angular' && <Link to={'projects/angular'}><FaAngular style={{ color: "#870f0f", fontSize: '36px' }} /></Link>}
                                    {p.category === 'JS' && <Link to={'projects/js'}> <RiJavascriptFill style={{ color: "#b3b31a", fontSize: '36px' }} /></Link>}
                                    {p.category === 'Python' && <Link to={'projects/python'}> <SiPython style={{ color: "#0093ff", fontSize: '34px' }} /></Link>}
                                    {p.category === 'PhP' && <Link to={'projects/php'}> <TbFileTypePhp style={{ color: "#be8cff", fontSize: '36px' }} /></Link>}
                                    {p.category === 'HTMLCSS' && <Link to={'projects/htmlcss'}> <SiHtml5 style={{ color: "#cb6d07", fontSize: '34px' }} /></Link>}
                                    {roleType === 2 ?
                                        <IoMdHome size={36} style={{ color: p.homePage === true ? "green" : "red" }} onClick={() => toggleHomePage(p._id)} /> :
                                        ''
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

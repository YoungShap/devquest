import React, { useEffect, useState } from 'react'
import '../components/Home.css'
import '../components/Cards.css'
import '../categories/Categories.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { BsFillHeartFill, BsFillTrash3Fill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GeneralContext } from '../App';
import { BiLogoMongodb } from 'react-icons/bi';
import { SiExpress, SiHtml5, SiPython } from 'react-icons/si';
import { FaAngular, FaNodeJs, FaReact } from 'react-icons/fa';
import { DiRuby } from 'react-icons/di';
import { RiJavascriptFill } from 'react-icons/ri';
import { TbFileTypePhp } from 'react-icons/tb';
import { IoLogoCss3 } from 'react-icons/io';
import AddCardBtn from '../components/AddCardBtn';


export default function MyProjects() {
    const { user, favorite } = React.useContext(GeneralContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/projects", {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (user && user.devName) {
                    setProjects(data.filter(p => p.uploadBy === user.devName));
                    console.log(data);
                }
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            })
    }, [favorite]);

    const deleteProject = id => {
        if (!window.confirm('Are you sure you want to remove this Project?')) {
            return;
        }
        fetch(`http://localhost:4000/projects/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then(() => {
                setProjects(projects.filter(p => p._id !== id));
            });
    }


    return (
        <div className='main-container'>
            <div className='MyTitle'>
                <div className='profile-pic'></div>
                <h1 style={{marginTop:"4px"}} >{user.devName}</h1>
                <p>Here you'll find all of the Projects that You added</p>
                <div className='learn-icons-fav'>
                    <BiLogoMongodb style={{ color: "green" }} />
                    <SiExpress style={{ color: "#7d8000" }} />
                    <FaReact style={{ color: "teal" }} />
                    <FaAngular style={{ color: "#870f0f" }} />
                    <FaNodeJs style={{ color: "green" }} />
                    <DiRuby style={{ color: "#870f0f" }} />
                    <RiJavascriptFill style={{ color: "#b3b31a" }} />
                    <SiPython style={{ color: "#0093ff" }} />
                    <TbFileTypePhp style={{ color: "#be8cff" }} />
                    <SiHtml5 style={{ color: "#cb6d07" }} />
                    <IoLogoCss3 style={{ color: "#318cc3" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li><b>Customize and refine your projects with easy editing options.</b></li><br></br>
                        <li><b>Elevate your preferred projects to the Favorites tab for quick access.</b></li><br></br>
                        <li><b>Add more Projects to enrich the community's learning experience.</b></li><br></br>
                    </ul>

                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>
            </div>
            <div className='card-frame'>
                {
                    projects.map(p =>
                        <div className='project-card' key={p._id}>
                            <div className='card-image' style={{ backgroundImage: `url(http://localhost:4000/uploads/${p.imgSrc})` }}></div>
                            <h1 className='card-h1'>{p.name}</h1>
                            <div className='my-p'>
                                <p><b>Category : {p.category}</b></p>
                                <p><b>Dev Name : {p.dev}</b></p>
                                <div className='card-icons'>
                                    <Link to={p.ghub} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%', padding:"0" }} /></Link>
                                    <div className='spacer'></div>
                                    <div className='user-icons'>
                                    {user && <BsFillTrash3Fill className='Trash' size={26} style={{ color: 'white' }} onClick={() => deleteProject(p._id)} />}
                                    {user && <Link className='Edit' to={`/projects/edit/${p._id}`}><span><FiEdit size={26} /></span></Link>}
                                     {user && <BsFillHeartFill className='Heart' size={26} style={{ color: user.favorites.includes(p._id) ? 'red' : 'rgb(51, 49, 49)' }} onClick={() => favorite(p._id)} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

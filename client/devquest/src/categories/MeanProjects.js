import React, { useEffect, useState } from 'react'
import '../components/Home.css'
import '../components/Cards.css'
import './Categories.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { BsFillHeartFill, BsFillTrash3Fill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GeneralContext } from '../App';
import { Button } from '@mui/material';
import AddCardBtn from '../components/AddCardBtn';
import { BiLogoMongodb } from 'react-icons/bi';
import { SiExpress } from 'react-icons/si';
import { FaAngular, FaNodeJs } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import Searchbar, { search } from '../components/SearchBar';
import { LuExpand } from 'react-icons/lu';

export default function ReactProjects() {
    const { user, favorite, toggleHomePage, roleType, searchWord, snackbar, setIsLoading, homeProjects } = React.useContext(GeneralContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:4000/projects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data.filter(p => p.category === "Mean"));
            })
            .catch(() => {
                snackbar(
                    "There has been a problem with your fetch operation:"
                );
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [toggleHomePage, setIsLoading, snackbar, homeProjects]);

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
                snackbar('Project Deleted');
            })
            .catch(() => {
                snackbar(
                    "There has been a problem with your fetch operation:"
                );
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <div className='main-container'>
            <div className='MyTitle'>
                <h1>MEAN Stack</h1>
                <p className='p'>The MEAN stack is a dynamic web development framework known for its comprehensive and efficient components:</p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
                <div className='learn-icons'>
                    <BiLogoMongodb size={30} style={{ color: "green" }} />
                    <SiExpress size={30} style={{ color: "#7d8000" }} />
                    <FaAngular size={30} style={{ color: "#870f0f" }} />
                    <FaNodeJs size={30} style={{ color: "green" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li><b>MongoDB:</b> NoSQL database providing flexibility and scalability.</li><br></br>
                        <li><b>Express.js:</b> Minimalist web app framework for Node.js, streamlining server-side development.</li><br></br>
                        <li> <b>Angular:</b> Frontend framework for building dynamic and robust user interfaces.</li><br></br>
                        <li><b>Node.js:</b> Backend runtime enabling server-side JavaScript execution.</li>
                    </ul>
                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>
                <p className='learn-p'>Learn all about M.E.A.N Stack:</p>
            </div>
            <div className='learn-btns'>
                <Link to={'https://www.w3schools.com/angular/default.asp'} target='_blank'><Button>angular</Button></Link>
                <Link to={'https://www.w3schools.com/nodejs/default.asp'} target='_blank'><Button>Node.js</Button></Link>
                <Link to={'https://www.w3schools.com/mongodb/index.php'} target='_blank'><Button>MongoDB</Button></Link>
            </div>

            <div className='card-frame'>
                {
                    projects.filter(p => search(searchWord, p.category, p.name, p.dev)).map(p =>
                        <div className='project-card' key={p._id}>
                            {p.imgSrc ? (
                                <div className='card-image' style={{ backgroundImage: `url(http://localhost:4000/uploads/${p.imgSrc})` }}></div>
                            ) : (
                                <div className='card-image-default'>No Image Found</div>
                            )}
                            <h1 className='card-h1'>{p.name}</h1>
                            <div className='my-p'>
                                <p><b>Category : {p.category}</b></p>
                                <p><b>Dev Name : {p.dev}</b></p>
                                <div className='card-icons'>
                                    <Link to={p.ghub} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '29px', backgroundColor: 'black', borderRadius: '50%', padding: "0px 2px", marginTop: "8px" }} /></Link>
                                    <div className='user-icons'>
                                        {((user && p.uploadBy === user.devName) || (roleType === 2)) &&
                                            <BsFillTrash3Fill className='Trash' size={23.5} style={{ color: '#b9b0b0' }} onClick={() => deleteProject(p._id)} />
                                        }
                                        {(user && (p.uploadBy === user.devName || roleType === 2)) &&
                                            <Link className='Edit' to={`/projects/edit/${p._id}`}>
                                                <span><FiEdit size={23.5} style={{ color: "#b9b0b0" }} /></span>
                                            </Link>
                                        }

                                        {user && <BsFillHeartFill className='Heart' size={24} style={{ color: user.favorites.includes(p._id) ? '#cf1212' : '#7d7575' }} onClick={() => favorite(p._id)} />}
                                    </div>
                                    <div className='expand-card'>
                                    <Link to={`/projects/expand/${p._id}`}>
                                            <LuExpand size={user ? 23.5 : 26} />
                                        </Link>
                                    </div>
                                    {roleType === 2 ?
                                        <IoMdHome size={28} style={{ color: p.homePage === true ? "#2bb32b" : "red", backgroundColor: 'rgb(39 39 39)', borderRadius: "8px", marginTop: "13px" }} onClick={() => toggleHomePage(p._id)} /> :
                                        ''
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

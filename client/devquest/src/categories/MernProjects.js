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
import { FaNodeJs, FaReact } from 'react-icons/fa';
import { SiExpress } from 'react-icons/si';
import { IoMdHome } from 'react-icons/io';
import { LuExpand } from "react-icons/lu";
import Searchbar, { search } from '../components/SearchBar';


export default function ReactProjects() {
    const { user, favorite, toggleHomePage, roleType, searchWord } = React.useContext(GeneralContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/projects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data.filter(p => p.category === "Mern"));
                console.log(data);
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            })
    }, [toggleHomePage]);

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
                <h1>MERN Stack</h1>
                <p className='p'>The MERN stack is a popular web development framework known for its versatility and scalability:</p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
                <div className='learn-icons'>
                    <BiLogoMongodb size={30} style={{ color: "green" }} />
                    <SiExpress size={30} style={{ color: "#7d8000" }} />
                    <FaReact size={30} style={{ color: "teal" }} />
                    <FaNodeJs size={30} style={{ color: "green" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li><b>MongoDB:</b> NoSQL database offering flexibility and scalability.</li><br></br>
                        <li><b>Express.js:</b> Minimalist web app framework for Node.js, simplifying server-side development.</li><br></br>
                        <li> <b>React:</b> JavaScript library for dynamic and interactive user interfaces on the client side.</li><br></br>
                        <li><b>Node.Js:</b> Backend runtime enabling server-side JavaScript execution.</li>
                    </ul>
                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>
                <p className='learn-p'>Learn all about M.E.R.N Stack:</p>
            </div>
            <div className='learn-btns'>
                <Link to={'https://www.w3schools.com/react/default.asp'} target='_blank'><Button>react</Button></Link>
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
                                    <Link to={p.ghub} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '29px', backgroundColor: 'black', borderRadius: '50%', padding: "0", marginTop: "8px" }} /></Link>
                                    <div className='user-icons'>
                                        {user && <BsFillTrash3Fill className='Trash' size={23.5} style={{ color: 'white' }} onClick={() => deleteProject(p._id)} />}
                                        {user && <Link className='Edit' to={`/projects/edit/${p._id}`}><span><FiEdit size={23.5} /></span></Link>}
                                        {user && <BsFillHeartFill className='Heart' size={23.5} style={{ color: user.favorites.includes(p._id) ? 'red' : 'rgb(51, 49, 49)' }} onClick={() => favorite(p._id)} />}
                                    </div>
                                    <div className='expand-card'>
                                        <Link to={`/projects/expand/${p._id}`}><LuExpand size={23.5} /></Link>
                                    </div>
                                        {roleType === 2 ?
                                            <IoMdHome size={28} style={{ color: p.homePage === true ? "#2bb32b" : "red", backgroundColor: 'rgb(22, 22, 22)', borderRadius: "50%", marginTop: "13px" }} onClick={() => toggleHomePage(p._id)} /> :
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

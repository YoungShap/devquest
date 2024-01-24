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
import { SiPython } from 'react-icons/si';
import { IoMdHome } from 'react-icons/io';
import { LuExpand } from "react-icons/lu";
import Searchbar, { search } from '../components/SearchBar';

export default function ReactProjects() {
    const { user, favorite, toggleHomePage, roleType, searchWord, snackbar, setIsLoading } = React.useContext(GeneralContext);
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
                setProjects(data.filter(p => p.category === "Python"));
            })
            .catch((error) => {
                snackbar(
                    "There has been a problem with your fetch operation:",
                    error
                );
            })
            .finally(() => {
                setIsLoading(false);
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
                snackbar('Project Deleted');
            })
            .catch((error) => {
                snackbar(
                    "There has been a problem with your fetch operation:",
                    error
                );
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <div className='main-container'>
            <div className='MyTitle'>
                <h1>Python</h1>
                <p className='p'>
                    Python is a versatile language for web application development:
                </p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
                <div className='learn-icons'>
                    <SiPython size={28} style={{ color: "#0093ff" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li><b>Readability:</b> Python prioritizes clean and understandable code.</li>
                        <br />
                        <li><b>Modularity:</b> Build scalable applications with Python's modular components.</li>
                        <br />
                        <li><b>Data Science:</b> Python excels with rich libraries for data analysis, machine learning, and visualization.</li>
                        <br />
                        <li><b>Automation:</b> Use Python for efficient automation and workflows.</li>
                    </ul>
                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>

                <p className='learn-p'>Learn all about Python:</p>
            </div>
            <div className='learn-btns'>
                <Link to={'https://www.python.org/'} target='_blank'><Button>Python.org</Button></Link>
                <Link to={'https://www.codecademy.com/learn/learn-python-3'} target='_blank'><Button>CodeCademy</Button></Link>
                <Link to={'https://www.w3schools.com/python/default.asp'} target='_blank'><Button>w3schools</Button></Link>
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

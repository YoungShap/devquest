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
import { FaAngular } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import Searchbar, { search } from '../components/SearchBar';
import { LuExpand } from 'react-icons/lu';

export default function AngualrProjects() {
    const { user, favorite, toggleHomePage, roleType, searchWord, snackbar } = React.useContext(GeneralContext);
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
                setProjects(data.filter(p => p.category === "Angular"));
                console.log(data);
            })
            .catch((error) => {
                snackbar(
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
                snackbar('Project Deleted');
            })
            .catch((error) => {
                snackbar(
                    "There has been a problem with your fetch operation:",
                    error
                );
            })
    };

    return (
        <div className='main-container'>
            <div className='MyTitle'>
                <h1>Angular</h1>
                <p className='p'>
                    Angular, a full-fledged TypeScript framework, empowers developers in building dynamic web applications with precision and efficiency:
                </p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
                <div className='learn-icons'>
                    <FaAngular size={30} style={{ color: "#870f0f" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li key={1} ><b>Declarative:</b> Simplifying UI creation across app states in Angular.</li><br></br>
                        <li key={2} ><b>Component-Based:</b> Crafting dynamic UIs through modular components.</li><br></br>
                        <li key={3} ><b>Two-Way Binding:</b> Achieving real-time updates by syncing model and view in Angular.</li><br></br>
                        <li key={4} ><b>Templates:</b> Enhancing view dynamics with HTML templates in Angular.</li>
                    </ul>

                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>
                <p className='learn-p'>Learn all about Angular:</p>
            </div>
            <div className='learn-btns'>
                <Link to={'https://angular.io/'} target='_blank'><Button>Angular.io</Button></Link>
                <Link to={'https://www.codecademy.com/learn/learn-angularjs'} target='_blank'><Button>CodeCademy</Button></Link>
                <Link to={'https://www.w3schools.com/angular/'} target='_blank'><Button>w3schools</Button></Link>
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
                                        <Link to={`/projects/expand/${p._id}`}><LuExpand size={23.5} /></Link>
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

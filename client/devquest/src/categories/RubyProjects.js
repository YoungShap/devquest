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
import { DiRuby } from 'react-icons/di';
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
                setProjects(data.filter(p => p.category === "Ruby"));
            })
            .catch(() => {
                snackbar(
                    "There has been a problem with your fetch operation:",
                    
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
                <h1>Ruby on Rails</h1>
                <p className='p'>Ruby on Rails, often simply called Rails, is a robust web development framework known for its convention over configuration and opinionated design:</p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
                <div className='learn-icons'>
                    <DiRuby size={28} style={{ color: "#870f0f", padding: "7px" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li><b>Ruby:</b> Dynamic, object-oriented programming language.</li><br></br>
                        <li><b>Rails:</b> Full-stack web application framework built on the Ruby language.</li><br></br>
                        <li> <b>ActiveRecord:</b> ORM (Object-Relational Mapping) facilitating database interactions.</li><br></br>
                        <li><b>ActionView:</b> Component for handling the presentation layer.</li>
                    </ul>
                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>
                <p className='learn-p'>Learn all about Ruby on Rails:</p>
            </div>
            <div className='learn-btns'>
                <Link to={'https://guides.rubyonrails.org/'} target='blank'><Button>RailsGuides</Button></Link>
                <Link to={'https://www.codecademy.com/learn/learn-rails'} target='blank'><Button>CodeCademy</Button></Link>
                <Link to={'http://railscasts.com/'} target='blank'><Button>RailsCasts</Button></Link>
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

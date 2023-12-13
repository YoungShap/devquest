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

export default function ReactProjects() {
    const { user, favorite, toggleHomePage, roleType } = React.useContext(GeneralContext);
    const [projects, setProjects] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:4000/projects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data);
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
                <h1>Ruby on Rails</h1>
                <p className='p'>Ruby on Rails, often simply called Rails, is a robust web development framework known for its convention over configuration and opinionated design:</p><br></br><br></br>
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
                    projects.filter(p => p.category === "Ruby").map(p =>
                        <div className='project-card' key={p._id}>
                            <div className='card-image' style={{ backgroundImage: `url(http://localhost:4000/uploads/${p.imgSrc})` }}></div>
                            <h1 className='card-h1'>{p.name}</h1>
                            <div className='my-p'>
                                <p><b>Category : {p.category}</b></p>
                                <p><b>Dev Name : {p.dev}</b></p>
                                <div className='card-icons'>
                                    <Link to={p.ghub} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%', padding:"0" }} /></Link>
                                    {roleType === 2 ?
                                        <IoMdHome size={38} style={{ color: p.homePage === true ? "#2bb32b" : "red", backgroundColor: 'rgb(22, 22, 22)', borderRadius:"50%", marginTop:"4px" }} onClick={() => toggleHomePage(p._id)} /> :
                                        ''
                                    }
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

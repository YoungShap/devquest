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
import { FaReact } from 'react-icons/fa';
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
                <h1>React</h1>
                <p className='p'>
                    React, a dynamic JavaScript library, empowers web developers with its robust capabilities in crafting interactive applications:
                </p>
                <br />
                <br />
                <div className='learn-icons'>
                    <FaReact size={30} style={{ color: "teal" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li><b>Declarative:</b> Simplifies UI creation with a clear state view syntax.</li><br></br>
                        <li><b>Component-Based:</b> Develops modular, reusable components for interactive UIs.</li><br></br>
                        <li><b>Virtual DOM:</b> Optimizes performance by updating only necessary parts efficiently.</li><br></br>
                        <li><b>JSX:</b> Simplifies dynamic UI development with a JavaScript syntax closely resembling HTML in React.</li>


                    </ul>





                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>

                <p className='learn-p'>Learn all about React:</p>
            </div>
            <div className='learn-btns'>
                <Link to={'https://reactjs.org/'} target='_blank'><Button>React.Dev</Button></Link>
                <Link to={'https://www.codecademy.com/learn/react-101'} target='_blank'><Button>CodeCademy</Button></Link>
                <Link to={'https://www.w3schools.com/react/default.asp'} target='_blank'><Button>w3schools</Button></Link>
            </div>

            <div className='card-frame'>
                {
                    projects.filter(p => p.category === "React").map(p =>
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

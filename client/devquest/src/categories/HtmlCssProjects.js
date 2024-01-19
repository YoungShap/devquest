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
import { SiHtml5 } from 'react-icons/si';
import { IoLogoCss3, IoMdHome } from 'react-icons/io';
import Searchbar, { search } from '../components/SearchBar';
import { LuExpand } from 'react-icons/lu';

export default function ReactProjects() {
    const { user, favorite, toggleHomePage, roleType, searchWord  } = React.useContext(GeneralContext);
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
                setProjects(data.filter(p => p.category === "HTMLCSS"));
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
                <h1>HTML & CSS</h1>
                <p className='p'>
                    HTML and CSS form the foundation of web development, enabling the creation of visually appealing and structured websites.
                </p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
                <div className='learn-icons'>
                    <SiHtml5 size={30} style={{ color: "#cb6d07" }} />
                    <IoLogoCss3 size={31} style={{ color: "#318cc3" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li><b>Readability:</b> Prioritize clean and structured code with HTML and CSS.</li><br></br>
                        <li><b>Modularity:</b> Build scalable layouts seamlessly using HTML and CSS.</li><br></br>
                        <li><b>Web Development:</b> HTML and CSS are fundamental for both static and dynamic websites.</li><br></br>
                        <li><b>Styling:</b> Leverage CSS effectively for presentation in web development.</li>
                    </ul>
                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>
                <p className='learn-p'>Learn all about HTML & CSS:</p>
            </div>
            <div className='learn-btns'>
                <Link to={'https://www.w3schools.com/html/default.asp'} target='_blank'><Button>w3 HTML</Button></Link>
                <Link to={'https://developer.mozilla.org/en-US/docs/Web/CSS'} target='_blank'><Button>CSS MDN</Button></Link>
                <Link to={'https://www.codecademy.com/learn/learn-css'} target='_blank'><Button>CodeCademy</Button></Link>
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
                                    <Link to={p.ghub} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '29px', backgroundColor: 'black', borderRadius: '50%', padding: "0", marginTop: "9px" }} /></Link>
                                    <div className='user-icons'>
                                        {user && <BsFillTrash3Fill className='Trash' size={23.5} style={{ color: '#b9b0b0' }} onClick={() => deleteProject(p._id)} />}
                                        {user && <Link className='Edit' to={`/projects/edit/${p._id}`}><span><FiEdit size={23.5} style={{color:"#b9b0b0"}}/></span></Link>}
                                        {user && <BsFillHeartFill className='Heart' size={23.5} style={{ color: user.favorites.includes(p._id) ? '#cf1212' : '#7d7575' }} onClick={() => favorite(p._id)} />}
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

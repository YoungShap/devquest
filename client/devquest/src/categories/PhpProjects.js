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
import { TbFileTypePhp } from "react-icons/tb";
import { IoMdHome } from 'react-icons/io';
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
                setProjects(data.filter(p => p.category === "PhP"));
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
                <h1>PHP</h1>
                <p className='p'>
                    PHP is a powerful language for server-side web development.
                </p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
                <div className='learn-icons'>
                    <TbFileTypePhp size={32} style={{ color: "#be8cff" }} />
                </div>
                <div className='info-and-add'>
                    <ul>
                        <li><b>Readability:</b> Prioritize clean code practices in PHP development.</li><br></br>
                        <li><b>Modularity:</b> Create scalable applications with PHP's modular components.</li><br></br>
                        <li><b>Web Development:</b> PHP is a prevalent choice for dynamic websites and server-side applications.</li><br></br>
                        <li><b>Server-Side Scripting:</b> Harness PHP for efficient dynamic server-side scripting.</li>
                    </ul>

                    {
                        user &&
                        <AddCardBtn />
                    }
                </div>
                <p className='learn-p'>Learn all about PHP:</p>
            </div>
            <div className='learn-btns'>
                <Link to={'https://www.php.net/'} target='_blank'><Button>PHP.net</Button></Link>
                <Link to={'https://www.w3schools.com/php/'} target='_blank'><Button>w3schools</Button></Link>
                <Link to={'https://www.phptherightway.com/'} target='_blank'><Button>php</Button></Link>
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

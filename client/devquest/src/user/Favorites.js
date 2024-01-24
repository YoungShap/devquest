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
import Searchbar, { search } from '../components/SearchBar';
import { LuExpand } from 'react-icons/lu';


export default function Favorites() {
    const { user, favorite, searchWord, roleType, snackbar, setIsLoading} = React.useContext(GeneralContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setIsLoading(true);
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
                setProjects(data.filter(p => user.favorites.includes(p._id)));
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
    }, [user]);

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
                <h1>Favorite Projects</h1>
                <p>Here you'll find all your Favorite Projects</p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
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
            </div>
            <div className='card-frame'>
                {
                    projects.filter(p => search(searchWord, p.category, p.name, p.dev)).map(p =>
                        <div className='project-card' key={p._id}>
                            <div className='card-image' style={{ backgroundImage: `url(http://localhost:4000/uploads/${p.imgSrc})` }}></div>
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
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
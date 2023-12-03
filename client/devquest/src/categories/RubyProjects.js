import React, { useEffect, useState } from 'react'
import '../components/Home.css'
import '../components/Cards.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { BsFillHeartFill, BsFillTrash3Fill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GeneralContext } from '../App';

export default function ReactProjects() {
    const { user, favorite } = React.useContext(GeneralContext);
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
    }, []);

    const deleteProject = id => {
        if (!window.confirm('Are you sure you want to remove this Project?')) {
            return;
          }
        fetch(`http://localhost:4000/projects/${id}`, {
            method: 'DELETE',
            credentials:'include',
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
                <h1>Ruby</h1>
                <p>filler </p>
            </div>
            <div className='card-frame'>
                {
                    projects.filter(p => p.category == "Ruby").map(p =>
                        <div className='project-card'>
                           <div className='card-image' style={{ backgroundImage: `url(http://localhost:4000/uploads/${p.imgSrc})` }}></div>
                            <h1 className='card-h1'>{p.name}</h1>
                            <div className='my-p'>
                                <p><b>Category : {p.category}</b></p>
                                <p><b>Dev Name : {p.dev}</b></p>
                                <div className='card-icons'>
                                    <Link to={p.ghub} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '36px', backgroundColor: 'black', borderRadius: '50%' }} /></Link>
                                    {user && <BsFillTrash3Fill className='Trash' size={26} style={{color:'white'}} onClick={() => deleteProject(p._id)} />}
                                   { user && <Link className='Edit' to={`/projects/edit/${p._id}`}><span><FiEdit size={26} /></span></Link> }
                                   <span > {user && <BsFillHeartFill className='Heart' size={26} style={{ color: user.favorites.includes(p._id) ? 'red' : 'rgb(51, 49, 49)' }} onClick={() => favorite(p._id)} />}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

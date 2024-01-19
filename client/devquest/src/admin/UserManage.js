import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../App';
import Searchbar, { search } from '../components/SearchBar';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { FaDev } from 'react-icons/fa';
import './SandBox.css';
import './UserCards.css';
import { Link, useNavigate } from 'react-router-dom';

export default function UserManage() {
    const { searchWord } = useContext(GeneralContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [displayMode, setDisplayMode] = useState('table'); // 'table' or 'cards'

    useEffect(() => {
        fetch(`http://localhost:4000/auth/users`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token
            },
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(() => {
                navigate('/error');
            })
    }, []);

    const deleteUser = id => {
        if (!window.confirm('Are you sure you want to remove this User?')) {
            return;
        }
        fetch(`http://localhost:4000/auth/users/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then(() => {
                setUsers(users.filter(p => p._id !== id));
            });
    }

    const toggleDisplayMode = mode => {
        setDisplayMode(mode);
    }

    return (
        <div className='big-container'>
            <span className='MyTitle'>
                <h1>Admin Sandbox</h1>
                <p>Manage all Users </p><br></br><br></br>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
                <div className='display-toggle'>
                    <button onClick={() => toggleDisplayMode('table')}>Table View</button>
                    <button onClick={() => toggleDisplayMode('cards')}>Card View</button>
                </div>
            </span>
            <div className={displayMode === 'table' ? 'clients-container1' : 'clients-container2'}>
                {displayMode === 'table' ? (
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Dev Name</th>
                                <th>Email</th>
                                <th>Options</th>
                                <th>User Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.filter(u => search(searchWord, u.firstName, u.lastName, u.email, u.devName)).map(u =>
                                    <tr key={u._id}>
                                        <td>{u.firstName}</td>
                                        <td>{u.lastName}</td>
                                        <td>{u.devName}</td>
                                        <td>{u.email}</td>
                                        <td className='icons' key={u._id}>
                                            <Link to={`/admin/users/edit/${u._id}`}>
                                                <span className='edit'>
                                                    <FiEdit size={22} />
                                                </span>
                                            </Link>
                                            <span className='delete'>
                                                {u.type === 'Dev' ? <BsFillTrash3Fill size={22} onClick={() => deleteUser(u._id)} /> : ''}
                                            </span>
                                        </td>
                                        <td>{u.type === 'Dev' ? <FaDev size={24} /> : <MdAdminPanelSettings size={26} />}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className='Cardframe'>
                        {
                            users.filter(u => search(searchWord, u.firstName, u.lastName, u.email, u.devName)).map(u =>
                                <div key={u._id} className='Card3'>
                                   {u.type === 'Dev' ? <FaDev size={54} style={{ color: '#d1d1d1', margin:'auto' }}/> : <MdAdminPanelSettings  size={60} style={{ color: '#d1d1d1', margin:'auto' }} />}
                                    <h1>{u.devName}</h1>
                                    <div className='my-p'>
                                        <p><b>User Level:</b> {u.type}</p>
                                        <p><b>First Name:</b> {u.firstName} <br /></p>
                                        <p><b>Last Name:</b> {u.lastName}</p>
                                        <p><b>Email:</b> {u.email}</p>
                                    </div>
                                    <div className='myIcons'>
                                        <div className='icons1'>
                                            <Link to={`/admin/users/edit/${u._id}`}>
                                                <span className='edit'>
                                                    <FiEdit size={22} />
                                                </span>
                                            </Link>
                                            <span className='delete'>
                                                {u.type === 'Dev' ? <BsFillTrash3Fill style={{ color: 'red', marginBottom: '1.5px' }} size={21.5} onClick={() => deleteUser(u._id)} /> : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

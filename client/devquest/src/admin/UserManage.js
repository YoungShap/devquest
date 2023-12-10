import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../App';
import Searchbar, { search } from '../components/SearchBar';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdAdminPanelSettings, MdBusinessCenter } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import './SandBox.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaDev } from 'react-icons/fa';

export default function UserManage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { setIsLoading, snackbar, roleType, user, searchWord } = useContext(GeneralContext);


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
    }, [])

    const deleteUser = id => {
        if (!window.confirm('Are you sure you want to remove this Project?')) {
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

    return (
        <div className='big-container'>
            <span className='MyTitle'><h1>Admin Sandbox</h1>
                <p>Manage all Users </p>
                <div className='search'><Searchbar /></div>
                {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
            </span>
            <div className='clients-container1'>
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
                            users.filter(u => search(searchWord, u.firstName, u.lastName, u.email,u.devName)).map(u =>
                                <tr key={u.id}>
                                    <td>{u.firstName}</td>
                                    <td>{u.lastName}</td>
                                    <td>{u.devName}</td>
                                    <td>{u.email}</td>
                                    <td className='icons'>
                                        <Link to={`/admin/users/edit/${u._id}`}> <span className='edit'>
                                            <FiEdit size={22} />
                                        </span></Link>
                                        <span className='delete'>
                                           { u.type === 'Dev' ? <BsFillTrash3Fill size={22} onClick={() => deleteUser(u._id)} /> : ''}
                                        </span>
                                    </td>
                                    <td>{u.type === 'Dev' ? <FaDev size={24} /> : <MdAdminPanelSettings size={26} />}</td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

import { createContext, useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import RouterAuth from './RouterAuth';
import Navbar from './components/Navbar';
import TopNavbar from './components/TopNavbar';
import { useNavigate } from 'react-router-dom';
import { RoleTypes } from './Config';

export const GeneralContext = createContext();

function App() {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [roleType, setRoleType] = useState(RoleTypes.none);
    const [search, setSearch] = useState('');
    const [searchWord, setSearchWord] = useState('');
    const [homeProjects, setHomeProjects] = useState([]);

    // LOGIN STATUS:
    useEffect(() => {
        if (localStorage.token) {
            fetch(`http://localhost:4000/auth/login`, {
                credentials: 'include',
                headers: {
                    'Authorization': localStorage.token
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.text().then(x => {
                            throw new Error(x);
                        });
                    }
                })
                .then(data => {
                    setUser(data);
                    if (data.type === 'Dev') {
                        setRoleType(RoleTypes.dev);
                    } else if (data.type === 'Admin') {
                        setRoleType(RoleTypes.admin);
                    } else {
                        setRoleType(RoleTypes.none);
                    }
                })
                .catch(err => {
                    setRoleType(RoleTypes.none);
                    navigate('/');
                });
        } else {
            navigate('/');
        }
    }, []);

    // FAVORITE FUNCTION USED IN 10 MORE COMPONENTS(that is why its in the App):
    const favorite = async (id) => {
        const isAlreadyFav = user.favorites.includes(id);
        const updatedFavs = isAlreadyFav ? user.favorites.filter((favId) => favId !== id) :
            [...user.favorites, id];
        const dataToUpdate = {
            favorites: updatedFavs,
        };
        try {
            const response = await fetch(`http://localhost:4000/auth/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.token
                },
                body: JSON.stringify(dataToUpdate),
            });
            if (!response.ok) {
                throw new Error("Error updating user");
            }

            const updatedUser = await response.json();
            console.log("Updated User:", updatedUser);

            setUser((user) => ({ ...user, favorites: updatedUser.favorites }));
        }
        catch (err) {
            console.error(err);
        }
    };

    // Admin only function to add/remove projects from the home page
    const toggleHomePage = (id) => {
        fetch(`http://localhost:4000/projects/toggleHome/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error updating user");
                }
                return response.json();
            })
            .then(updatedHome => {
                setHomeProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project._id === id ? { ...project, homePage: updatedHome.homePage } : project
                    )
                );
            })
            .catch(error => {
                console.error('Toggle failed:', error);
                // Handle error
            });
    };

    return (
        <GeneralContext.Provider value={{
            user, setUser, setRoleType, favorite, roleType, search,
            setSearch, searchWord, setSearchWord, toggleHomePage, homeProjects,
            setHomeProjects
        }}>
            <TopNavbar />
            <Navbar />
            <div className="App">

                {user ?
                    <Router /> :
                    <RouterAuth />
                }


            </div>
        </GeneralContext.Provider>
    );
}

export default App;

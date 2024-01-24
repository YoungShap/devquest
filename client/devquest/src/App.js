import { createContext, useCallback, useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import RouterAuth from './RouterAuth';
import Navbar from './components/Navbar';
import TopNavbar from './components/TopNavbar';
import { useNavigate } from 'react-router-dom';
import { RoleTypes } from './Config';
import Snackbar from './components/Snackbar';
import Loader from './components/Loader';


export const GeneralContext = createContext();

function App() {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [roleType, setRoleType] = useState(RoleTypes.none);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [snackbarText, setSnackbarText] = useState('');
    const [homeProjects, setHomeProjects] = useState([]);

    const snackbar = text => {
        setSnackbarText(text);
        setTimeout(() => setSnackbarText(''), 3 * 1000);
    }

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
                    snackbar(`${data.devName} Is Connected`);
                })
                .catch(err => {
                    setRoleType(RoleTypes.none);

                });
        } else {
           snackbar('No User Connected');
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

            setUser((user) => ({ ...user, favorites: updatedUser.favorites }));
            snackbar('Success');
        }
        catch (err) {
            snackbar(err);
        }

    };

    // Admin only function to add/remove projects from the home page
    const toggleHomePage = useCallback((id) => {


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
                snackbar(`Toggle Successful`);
            })
            .catch(error => {
                console.error('Toggle failed:', error);
            })
            .finally(() => {

            });
    }, [homeProjects]);

    return (
        <GeneralContext.Provider value={{
            user, setUser, setRoleType, favorite, roleType, search,
            setSearch, searchWord, setSearchWord, toggleHomePage, homeProjects,
            setHomeProjects, snackbar, setIsLoading
        }}>
            <TopNavbar />
            <Navbar />
            <div className="App">

                {user ?
                    <Router /> :
                    <RouterAuth />
                }
                {isLoading && <Loader />}
                {snackbarText && <Snackbar text={snackbarText} />}


            </div>
        </GeneralContext.Provider>
    );
}

export default App;

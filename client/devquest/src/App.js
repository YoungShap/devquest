import { createContext, useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import Navbar from './components/Navbar';
import TopNavbar from './components/TopNavbar';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

function App() {
  const [user, setUser ] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.token) {
        // setLoading(true);

        fetch("http://localhost:4000/auth/login", {
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
        })
        .catch(err => {
            // snackbar('משתמש לא מחובר');
            navigate('/');
        })
        .finally(() => {
            // setLoading(false);
        });
    } else {
        navigate('/');
    }
}, []);
  return (
    <GeneralContext.Provider value={{ user, setUser}}>
    <div className="App">
      <TopNavbar />
      <Navbar />
      <Router/>
    </div>
    </GeneralContext.Provider>
  );
}

export default App;

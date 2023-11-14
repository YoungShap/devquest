import './App.css';
import Router from './Router';
import Navbar from './components/Navbar';
import TopNavbar from './components/TopNavbar';

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Navbar />
      <Router/>
    </div>
  );
}

export default App;

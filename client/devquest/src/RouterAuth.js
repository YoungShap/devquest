import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./user/Login";
import SignUp from "./user/SignUp";
import About from "./components/About";
import ReactProjects from "./categories/ReactProjects";
import MernProjects from "./categories/MernProjects";
import MeanProjects from "./categories/MeanProjects";
import RubyProjects from "./categories/RubyProjects";
import AngularProjects from "./categories/AngularProjects";
import JavaScriptProjects from "./categories/JavaScriptProjects";
import PythonProjects from "./categories/PythonProjects";
import PhpProjects from "./categories/PhpProjects";
import HtmlCssProjects from "./categories/HtmlCssProjects";
import CardExpand from "./components/CardExpand";

export default function Router() {  // this router is for when a user is connected  //
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/projects/expand/:id' element={<CardExpand />} />
            <Route path='/projects/mern' element={<MernProjects />} />
            <Route path='/projects/mean' element={<MeanProjects />} />
            <Route path='/projects/ruby' element={<RubyProjects />} />
            <Route path='projects/react' element={<ReactProjects />} />
            <Route path='/projects/angular' element={<AngularProjects/>} />
            <Route path='/projects/js' element={<JavaScriptProjects/>} />
            <Route path='/projects/python' element={<PythonProjects/>} />
            <Route path='/projects/php' element={<PhpProjects />} />
            <Route path='/projects/htmlcss' element={<HtmlCssProjects />} />
            {/* <Route path="/error" element={<ErrorPage/>} />  */}
        </Routes>
    )
}
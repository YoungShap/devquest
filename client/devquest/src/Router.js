import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ReactProjects from "./categories/ReactProjects";
import MernProjects from "./categories/MernProjects";
import MeanProjects from "./categories/MeanProjects";
import RubyProjects from "./categories/RubyProjects";
import AngularProjects from "./categories/AngularProjects";
import JavaScriptProjects from "./categories/JavaScriptProjects";
import PythonProjects from "./categories/PythonProjects";
import PhpProjects from "./categories/PhpProjects";
import HtmlCssProjects from "./categories/HtmlCssProjects";
import AddProject from "./CRUD/AddProject";
import EditProject from "./CRUD/EditProject";
import Login from "./user/Login";
import SignUp from "./user/SignUp";
import Favorites from "./user/Favorites";
import MyProjects from "./user/MyProjects";
import UserManage from "./admin/UserManage";
import Account from "./user/Account";
import EditUsers from "./admin/EditUsers";


export default function Router() {  // this router is for when a user is connected  //
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='projects/add' element={<AddProject />} />
            <Route path='projects/edit/:id' element={<EditProject />} />
            <Route path='/projects/favorites' element={<Favorites />} />
            <Route path='/projects/myprojects' element={<MyProjects />} />
            <Route path='/admin/sandbox' element={<UserManage />} />
            <Route path='/account' element={<Account />} />
            <Route path='/admin/users/edit/:id' element={<EditUsers />} />
            <Route path='/projects/mern' element={<MernProjects />} />
            <Route path='/projects/mean' element={<MeanProjects />} />
            <Route path='/projects/ruby' element={<RubyProjects />} />
            <Route path='projects/react' element={<ReactProjects />} />
            <Route path='/projects/angular' element={<AngularProjects/>} />
            <Route path='/projects/js' element={<JavaScriptProjects/>} />
            <Route path='/projects/python' element={<PythonProjects/>} />
            <Route path='/projects/php' element={<PhpProjects />} />
            <Route path='/projects/htmlcss' element={<HtmlCssProjects />} />
            {/* <Route path="*" element={<ErrorPage/>} />
            <Route path="/error" element={<ErrorPage/>} /> */}
        </Routes>
    )
}
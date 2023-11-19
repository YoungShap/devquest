import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./user/Login";
import ReactProjects from "./categories/ReactProjects";

export default function Router() {  // this router is for when a user is connected  //
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='projects/react' element={<ReactProjects />} />
            {/* <Route path='/cards/favorite' element={<FavoriteCards />} />
            <Route path='/admin/clients' element={<ClientManagement />} />
            <Route path='/business/cards/new' element={<CreateCard />} />
            <Route path='/business/cards/:id' element={<EditCard />} />
            <Route path='/admin/clients/:id' element={<ClientEdit/>} />
            <Route path='/cards/:id' element={<CardExpand/>} />
            <Route path='/account' element={<Account/>} />
            <Route path='/about' element={<About />} />
            <Route path="*" element={<ErrorPage/>} />
            <Route path="/error" element={<ErrorPage/>} /> */}
        </Routes>
    )
}
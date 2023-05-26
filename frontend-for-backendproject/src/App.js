import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import SneakerList from "./components/SneakerList";
import {ImportantDevices} from "@mui/icons-material";
import SignIn from "./components/LoginPage";
import Register from "./components/RegisterPage";
import TopDrawer from "./components/TopDrawer";
import AddSneaker from "./components/AddSneaker";
import EditSneaker from "./components/EditSneaker";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/sneakers" element={<SneakerList/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/sneakers/add" element={<AddSneaker/>}/>
                <Route path="/sneakers/edit/:id" element={<EditSneaker/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

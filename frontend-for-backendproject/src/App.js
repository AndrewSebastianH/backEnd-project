import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import SneakerList from "./components/SneakerList";
import {ImportantDevices} from "@mui/icons-material";
import SignIn from "./components/LoginPage";
import Register from "./components/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/sneakers" element={<SneakerList/>}/>
                <Route path="/users" element={<UserList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

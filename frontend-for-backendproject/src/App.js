import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import SneakerList from "./components/SneakerList";
import {ImportantDevices} from "@mui/icons-material";
import SignIn from "./components/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/users" element={<UserList/>}/>
                <Route path="add" element={<SignIn/>}/>
                <Route path="/" element={<SneakerList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

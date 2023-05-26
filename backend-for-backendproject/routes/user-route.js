import express from "express";
import {
    getUsers,
    getUserByID,
    updateUser,
    deleteUser,
    Register,
    Login,
    Logout
} from "../controllers/user-controller.js"
import { verifyToken } from "../middleware/verify-token.js";
import { refreshToken } from "../controllers/refresh-token.js";

const router = express.Router();

router.get('/users', verifyToken ,getUsers);
router.get('/users/:id',getUserByID);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);
router.post('/users', Register);
router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/token', refreshToken);

export default router;
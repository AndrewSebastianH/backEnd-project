import express from "express";
import {
    getUsers,
    getUserByID,
    // createUser,
    updateUser,
    deleteUser,
    Register,
    Login
} from "../controllers/user-controller.js"

const router = express.Router();

router.get('/users',getUsers);
router.get('/users/:id',getUserByID);
// router.post('/users',createUser);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);
router.post('/users', Register);
router.post('/login', Login);

export default router;
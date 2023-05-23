import express from "express";
import {
    getUsers,
    getUserByID,
    createUser, updateUser, deleteUser,
} from "../controllers/user-controller.js"

const router = express.Router();

router.get('/users',getUsers);
router.get('/users/:id',getUserByID);

router.post('/users',createUser);

router.patch('/users/:id',updateUser);

router.delete('/users/:id',deleteUser);

export default router;
import express from "express";
import {
    getSneakers,
    getSneakerByID,
    createSneaker,
    updateSneaker,
    deleteSneaker,
} from "../controllers/sneaker-controller.js"

import { verifyToken } from "../middleware/verify-token.js";
import { refreshToken } from "../controllers/refresh-token.js";

const router = express.Router();

router.get('/sneakers',verifyToken, getSneakers);
router.get('/sneakers/:id',getSneakerByID);
router.post('/sneakers',createSneaker);
router.patch('/sneakers/:id',updateSneaker);
router.delete('/sneakers/:id',deleteSneaker);

export default router;
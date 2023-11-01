import express from "express";
import {
    getUsers,
    createUser,
    getUserbyId,
    updateUser,
    deleteUser,
} from "../controllers/UserController.js"
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get('/',getUsers);
router.post('/create',upload.single('image'),createUser);
router.get('/:id',getUserbyId);
router.patch('/update/:id', upload.single('image') ,updateUser);
router.delete('/delete/:id',deleteUser);

export default router;
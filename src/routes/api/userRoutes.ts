import { Router } from "express";
const router = Router();
import {createUser,getUsers, getUserById} from '../../controllers/userController.js';

// api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userid
router.route('/:userId').get(getUserById);

export { router as UserRouter};

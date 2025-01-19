import { Router } from "express";
import {createUser,getUsers, getUserById} from '../../controllers/userController.js';

const router = Router();

// api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userid
router.route('/:userId').get(getUserById);

export { router as UserRouter};

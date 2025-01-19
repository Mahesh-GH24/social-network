import { Router } from "express";
import {createUser,getUsers, getUserById, createUserFriend} from '../../controllers/userController.js';

const router = Router();

// api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userid
router.route('/:userId').get(getUserById);

// api/users/:userid/friends/:friendid
router.route('/:userId/friends/:friendId').post(createUserFriend);

export { router as UserRouter};

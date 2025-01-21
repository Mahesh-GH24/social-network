import { Router } from "express";
import {createUser,getUsers, getUserById, createUserFriend, updateUser, deleteUser, deleteFriendOfUser} from '../../controllers/userController.js';

const router = Router();

// api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userid
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// api/users/:userid/friends/:friendid
router.route('/:userId/friends/:friendId').post(createUserFriend).delete(deleteFriendOfUser);

export { router as UserRouter};

import { Router } from "express";
const router = Router();
import {createUser,getUsers, getUserById} from '../../controllers/userController';

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById);

export default router;

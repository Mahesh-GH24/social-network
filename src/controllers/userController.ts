//import User from '../models/User.js';
import { Request, Response } from 'express';
import { User} from '../models/index.js';

//create a new user
export const createUser = async (req: Request, res: Response) => {
    try{
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}

//get all users
export const getUsers = async(_req: Request, res:Response) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err)
    }
}

//get user by id
export const getUserById = async(req: Request, res:Response) => {
    try{
        const users = await User.findOne({_id:req.params.userId})
        res.json(users);
    } catch (err) {
        res.status(500).json(err)
    }
}

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
        //const users = await User.findOne({_id:req.params.userId});
        //.select('-__v');

        const users = await User.findOne({_id:req.params.userId}).populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json(err)
    }
}

//create a new friend
export const createUserFriend = async (req: Request, res: Response) => {
    try{
        //userid
        const userId = req.params.userId;

        //friendid
        const friendId = req.params.friendId;

        const user = await User.findOneAndUpdate(
            {_id: userId},
            { $addToSet: {friends: friendId}},
            {new: true}
        );
        if (!user) {
            res
             .status(404)
             .json({ message: 'Unable to create a new friend. Please check either the UserId or FriendId' });
         } else {  
            res.json(user);
         }
    } catch (err) {
        res.status(500).json(err);
    }
}
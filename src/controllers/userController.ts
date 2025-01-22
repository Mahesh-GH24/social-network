//import User from '../models/User.js';
import { Request, Response } from 'express';
import { User, Thought} from '../models/index.js';

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
             .json({ message: 'Unable to create a new Friend. Please check either the UserId or FriendId' });
         } else {  
            res.json(user);
         }
    } catch (err) {
        res.status(500).json(err);
    }
}

//Update User
export const updateUser = async (req: Request, res: Response) => {
    try{
        //userid
        const userId = req.params.userId;   

        const user = await User.findOneAndUpdate(
            {_id: userId},
            { $set: req.body},
            {runValidators: true, new: true}
        );
        if (!user) {
            res
             .status(404)
             .json({ message: 'Unable to update User. Please check the UserId' });
         } else {  
            res.json(user);
         }
    } catch (err) {
        res.status(500).json(err);
    }
}


//Delete User
export const deleteUser = async (req: Request, res: Response) => {
    try{
        //userid
        const userId = req.params.userId;   

        const user = await User.findOneAndDelete( {_id: userId});
       
        if (!user) {
            res
             .status(404)
             .json({ message: 'Unable to delete User. Please check the UserId' });
         } else {  
            await Thought.deleteMany({ username: { $in: user.username} });
            res.json({message: 'User and associated Thoughts has been deleted!'});
         }
    } catch (err) {
        res.status(500).json(err);
    }
}

//Delete Friend of User
export const deleteFriendOfUser = async (req: Request, res: Response) => {
    try{
        //userid
        const userId = req.params.userId; 

        //friendid
        const friendId = req.params.friendId;


        const user = await User.findByIdAndUpdate( 
            {_id: userId},
            { $pull: {friends: friendId}},
            {new: true}
        );
       
        if (!user) {
            res
             .status(404)
             .json({ message: 'Unable to delete Friend of User. Please check the UserId or FriendId' });
         } else {  
            res.json({message: 'Friend of User has been deleted!'});
         }
    } catch (err) {
        res.status(500).json(err);
    }
}
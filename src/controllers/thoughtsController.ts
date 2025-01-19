import { Request, Response } from 'express';
import { User, Thought} from '../models/index.js';

//create a new thought
export const createThought = async (req: Request, res: Response) => {
    try{
        const dbThoughtData = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { username: req.body.username},
            { $addToSet: { thoughts: dbThoughtData._id } },
            { new: true }
        );
        if (!user) {
            res
             .status(404)
             .json({ message: 'Thought created, but found no user with that ID' });
         } else {  
            res.json(dbThoughtData);
         }
    } catch (err) {
        res.status(500).json(err);
    }
}

//get all thoughts
export const getThoughts = async(_req: Request, res:Response) => {
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json("Error is" + err);
    }
}

//get thought by id
export const getThoughtById = async(req: Request, res:Response) => {
    try{
        const thoughts = await Thought.findOne({_id:req.params.thoughtid})
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err)
    }
}

//Create a new reaction against thought - basically an update/put
export const createReactionToThought = async (req: Request, res: Response) => {
    try{
        //thoughtId
        const thoughtId = req.params.thoughtid;

        //reaction
       // const reaction = req.params.reaction;

        const thought = await Thought.findOneAndUpdate(
            {_id: thoughtId},
            { $addToSet: {reactions: req.body}},
            {runValidators: false, new: true}
        );
        if (!thought) {
            res
             .status(404)
             .json({ message: 'Unable to create a new Reaction. Please check the ThoughtId' });
         } else {  
            res.json(thought);
         }
    } catch (err) {
        res.status(500).json(err);
    }
}

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
    // try{
    //     //thoughtId
    //     const thoughtId = req.params.thoughtid;

    //     //reaction
    //    // const reaction = req.params.reaction;

    //     const thought = await Thought.findOneAndUpdate(
    //         {_id: thoughtId},
    //         { $addToSet: {reactions: req.body}},
    //         {runValidators: false, new: true}
    //     );
    //     if (!thought) {
    //         res
    //          .status(404)
    //          .json({ message: 'Unable to create a new Reaction. Please check the ThoughtId' });
    //      } else {  
    //         res.json(thought);
    //      }
    // } catch (err) {
    //     res.status(500).json(err);
    // }

    //Alternate
    try{
        //thoughtId
        const thoughtId = req.params.thoughtid;

        //get reaction data from the req body
        const {reactionBody, username} = req.body;

        //validate the i/p
        if(!reactionBody || !username) {
            return res.status(400).json({message: 'Reaction body and username are required'});
        }

        //create reaction object
       const reaction = {
        reactionBody,
        username,
        createdAt: new Date()
       };

       //find the thought and add the reaction object into reactions array
        const thought = await Thought.findByIdAndUpdate(
            {_id: thoughtId},
            { $push: {reactions: reaction}},
            {runValidators: false, new: true}
        );

        if (!thought) {
            res
             .status(404)
             .json({ message: 'Unable to create a new Reaction. Please check the ThoughtId' });
         } else {  
            res.status(200).json(thought);
         }
    } catch (err) {
        res.status(500).json({message: 'Server error',err});
    }
    return;
}

//Update Thought
export const updateThought = async (req: Request, res: Response) => {
    try{
        //thoughtid
        const thoughtid = req.params.thoughtid;   

        const thought = await Thought.findOneAndUpdate(
            {_id: thoughtid},
            { $set: req.body},
            {runValidators: true, new: true}
        );
        if (!thought) {
            res
             .status(404)
             .json({ message: 'Unable to update Thought. Please check the ThoughtId' });
         } else {  
            res.json(thought);
         }
    } catch (err) {
        res.status(500).json(err);
    }
}

//Delete Thought
export const deleteThought = async (req: Request, res: Response) => {
    try{
        //thoughtid
        const thoughtid = req.params.thoughtid;   

        const thought = await Thought.findOneAndDelete( {_id: thoughtid});
       
        if (!thought) {
            res
             .status(404)
             .json({ message: 'Unable to delete Thought. Please check the ThoughtId' });
         } else {  
            res.json({message: 'Thought has been deleted!'});
         }
    } catch (err) {
        res.status(500).json(err);
    }
}

//Delete Reaction by ReactionId
export const deleteReactionById = async (req: Request, res: Response) => {
    try{
        // reactionid
        // const reactionid = req.params.reactionid;
        
        // thoughtid
        // const thoughtid = req.params.thoughtid;

        //reactionid & thoughtid
        const { thoughtid, reactionid } = req.params;

        const thought = await Thought.findByIdAndUpdate( 
            {_id: thoughtid},
            { $pull: {reactions: {reactionId: reactionid}}},
            //{ $pull: {reactions: reactionid}},
            {new: true}
        );
       
        if (!thought) {
            res
             .status(404)
             .json({ message: 'Unable to delete Reaction of Thought. Please check the ThoughtId or ReactionId' });
         } else {  
            res.json({message: 'Reaction of Thought has been deleted!'});
         }
    } catch (err) {
        res.status(500).json(err);
    }
}

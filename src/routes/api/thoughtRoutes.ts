import { Router } from "express";
import { createThought,getThoughts,getThoughtById, createReactionToThought, updateThought, deleteThought, deleteReactionById } from "../../controllers/thoughtsController.js";

const router = Router();

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtid
router.route('/:thoughtid').get(getThoughtById).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtid/reactions
router.route('/:thoughtid/reactions').post(createReactionToThought);

// api/thoughts/:thoughtid/reactions/:reactionid
router.route('/:thoughtid/reactions/:reactionid').post(deleteReactionById);

export { router as ThoughtRouter};

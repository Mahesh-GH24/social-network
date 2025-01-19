import { Router } from "express";
import { createThought,getThoughts,getThoughtById, createReactionToThought } from "../../controllers/thoughtsController.js";

const router = Router();

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtid
router.route('/:thoughtid').get(getThoughtById);

// api/thoughts/:thoughtid/reactions
router.route('/:thoughtid/reactions').post(createReactionToThought);


export { router as ThoughtRouter};

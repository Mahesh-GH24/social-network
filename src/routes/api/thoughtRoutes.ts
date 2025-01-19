import { Router } from "express";
import { createThought,getThoughts,getThoughtById } from "../../controllers/thoughtsController.js";

const router = Router();

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtid
router.route('/:thoughtid').get(getThoughtById);

export { router as ThoughtRouter};

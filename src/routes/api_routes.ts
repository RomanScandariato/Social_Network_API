import { Router } from 'express';

import { 
    addNoteForUser,
    createUser, 
    deleteNoteForUser, 
    getAllNotes, 
    getUserById,
    addLikeToNote,
    getLikesForNote,
} from '../controllers/api_controller.js';

const router = Router();

// following MVC model type 
router.post('/users', createUser);

// Create a POST route that adds a note for a user
router.post('/note', addNoteForUser);

// Get a single user and their notes
router.get('/user/:user_id', getUserById);

// GET all notes
router.get('/notes', getAllNotes)

// DELETE a note for a user
router.delete('/note/:note_id', deleteNoteForUser)

router.put('/note/like', addLikeToNote)

router.get('/note/likes', getLikesForNote)

export default router;
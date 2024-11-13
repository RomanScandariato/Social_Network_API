import User from '../models/User.js';
import Note from '../models/Note.js';
export async function createUser(req, res) {
    try {
        // If req.body is the user's information(email, password), how do I use the model to create the user with req.body?
        const user = await User.create(req.body);
        res.json({
            user: user
        });
    }
    catch (error) {
        const errors = [];
        if (error.code === 11000) {
            errors.push('That email address is already in use');
        }
        else {
            for (const prop in error.errors) {
                errors.push(error.errors[prop].message);
            }
        }
        res.status(403).json({
            errors: errors
        });
    }
}
export async function addNoteForUser(req, res) {
    // req.body should have a user_id and text which is the text of the note
    // Find the user from the database, using the User model
    const user = await User.findById(req.body.user_id);
    const note = await Note.create({
        text: req.body.text,
        user: req.body.user_id
    });
    // Push a new note object/document to the user' notes array property
    user?.notes.push(note._id);
    await user?.save();
    res.json({
        user: user
    });
}
export async function getUserById(req, res) {
    const user_id = req.params.user_id;
    // const user = await User.findById(user_id).select('email -_id');
    const user = await User.findById(user_id).populate({
        path: 'notes',
        select: 'text'
    });
    res.json(user);
}
export async function getAllNotes(_, res) {
    // Find all notes and populate the 'user' property on each note
    const notes = await Note.find().populate({
        path: 'user',
        populate: {
            path: 'notes'
        }
    });
    // Send back the notes in a json response
    res.json(notes);
}
export async function deleteNoteForUser(req, res) {
    const note_id = req.params.note_id;
    const user_id = req.body.user_id;
    await Note.deleteOne({
        _id: note_id
    });
    // Find a user and remove the note id from their notes array
    await User.findByIdAndUpdate(user_id, {
        $pull: {
            notes: note_id
        }
    });
    res.json({
        message: 'Note removed successfully!'
    });
}
export async function addLikeToNote(req, res) {
    const note_id = req.body.note_id;
    const user_id = req.body.user_id;
    await Note.findByIdAndUpdate(note_id, {
        $push: {
            likes: {
                user: user_id
            }
        }
    });
    res.json({
        message: 'Like added successfully!'
    });
}
export async function getLikesForNote(req, res) {
    const note_id = req.body.note_id;
    const note = await Note.findById(note_id).populate({
        path: 'likes',
        populate: {
            path: 'user',
            select: 'email'
        }
    });
    res.json(note?.likes);
}
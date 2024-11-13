import User from '../models/User.js';
// import Thought from '../models/Thought.js';
// Get all users
export async function getAllUsers(_, res) {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}
// // Get a single user by ID
// export async function getUserById(req: Request, res: Response) {
// }
// // Create a new user
// export async function createNewUser(req: Request, res: Response) {
// }
// // Update a user by ID
// export async function updateUserById(req: Request, res: Response) {
// }
// // Delete a user by ID
// export async function deleteUserById(req: Request, res: Response) {
// }
// // Add a friend to a user's friend list
// export async function addFriendToUserFriendList(req: Request, res: Response) {
// }
// // Remove a friend from a user's friend list
// export async function removeFriendFromUserFriendList(req: Request, res: Response) {
// }
// // Get all thoughts
// export async function getAllThoughts(_: Request, res: Response) {
// }
// // Get a single thought by ID
// export async function getSingleThoughtById(req: Request, res: Response) {
// }
// // Create a thought for a user by ID
// export async function createThoughtForUserById(req: Request, res: Response) {
// }
// // Update a thought by ID
// export async function updateThoughtById(req: Request, res: Response) {
// }
// // Remove a thought by ID
// export async function removeThoughtById(req: Request, res: Response) {
// }
// // Create a reaction for a thought
// export async function createReactionForThought(req: Request, res: Response) {
// }
// // Remove a reaction from a thought by reaction ID
// export async function removeReactionFromThoughtByReactionId(req: Request, res: Response) {
// }
// export async function createUser(req: Request, res: Response) {
//     try {
//         // If req.body is the user's information(email, password), how do I use the model to create the user with req.body?
//         const user = await User.create(req.body);
//         res.json({
//             user: user
//         });
//     } catch (error: any) {
//         const errors: String[] = [];
//         if (error.code === 11000) {
//             errors.push('That email address is already in use');
//         } else {
//             for (const prop in error.errors) {
//                 errors.push(error.errors[prop].message);
//             }
//         }
//         res.status(403).json({
//             errors: errors
//         });
//     }
// }
// export async function addNoteForUser(req: Request, res: Response) {
//     // req.body should have a user_id and text which is the text of the note
//     // Find the user from the database, using the User model
//     const user = await User.findById(req.body.user_id);
//     const note = await Note.create({
//         text: req.body.text,
//         user: req.body.user_id
//     })
//     // Push a new note object/document to the user' notes array property
//     user?.notes.push(note._id);
//     await user?.save();
//     res.json({
//         user: user
//     });
// }
// export async function getUserById(req: Request, res: Response) {
//     const user_id = req.params.user_id;
//     // const user = await User.findById(user_id).select('email -_id');
//     const user = await User.findById(user_id).populate({
//         path: 'notes', 
//         select: 'text'
//     });
//     res.json(user);
// }
// export async function getAllNotes(_: Request, res: Response) {
//     // Find all notes and populate the 'user' property on each note
//     const notes = await Note.find().populate({
//         path: 'user',
//         populate: {
//             path: 'notes'
//         }
//     });
//     // Send back the notes in a json response
//     res.json(notes);
// }
// export async function deleteNoteForUser(req: Request, res: Response) {
//     const note_id = req.params.note_id;
//     const user_id = req.body.user_id;
//     await Note.deleteOne({
//         _id: note_id
//     });
//     // Find a user and remove the note id from their notes array
//     await User.findByIdAndUpdate(user_id, {
//         $pull: {
//             notes: note_id
//         }
//     });
//     res.json({
//         message: 'Note removed successfully!'
//     });
// }
// export async function addLikeToNote(req: Request, res: Response) {
//     const note_id = req.body.note_id;
//     const user_id = req.body.user_id;
//     await Note.findByIdAndUpdate(note_id, {
//         $push: {
//             likes: {
//                 user: user_id
//             }
//         }
//     });
//     res.json({
//         message: 'Like added successfully!'
//     });
// }
// export async function getLikesForNote(req: Request, res: Response) {
//     const note_id = req.body.note_id;
//     const note = await Note.findById(note_id).populate({
//         path: 'likes',
//         populate: {
//             path: 'user',
//             select: 'email'
//         }
//     });
//     res.json(note?.likes);
// }

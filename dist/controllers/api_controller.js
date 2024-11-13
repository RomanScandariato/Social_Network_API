import User from '../models/User.js';
import Thought from '../models/Thought.js';
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
export async function getUserById(req, res) {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id).populate({
        path: 'thoughts',
        select: 'thoughtText'
    });
    res.json(user);
}
export async function createNewUser(req, res) {
    try {
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
export async function updateUserById(req, res) {
    try {
        const user_id = req.params.user_id;
        const user = await User.findByIdAndUpdate(user_id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
}
export async function deleteUserById(req, res) {
    try {
        const user_id = req.params.user_id;
        const user = await User.findByIdAndDelete(user_id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.json({ message: 'User deleted successfully' });
        }
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}
export async function addFriendToUserFriendList(req, res) {
    try {
        const { user_id, friend_id } = req.body;
        const user = await User.findByIdAndUpdate(user_id, { $push: { friends: friend_id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.json({
                message: 'Friend added successfully',
                user: user
            });
        }
    }
    catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ message: 'Error adding friend' });
    }
}
export async function removeFriendFromUserFriendList(req, res) {
    try {
        const { user_id, friend_id } = req.body;
        const user = await User.findByIdAndUpdate(user_id, { $pull: { friends: friend_id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.json({
                message: 'Friend removed successfully',
                user: user
            });
        }
    }
    catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ message: 'Error removing friend' });
    }
}
export async function getAllThoughts(_, res) {
    try {
        const users = await Thought.find().populate('thoughts').populate('friends');
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}
export async function getSingleThoughtById(req, res) {
    try {
        const thought_id = req.params.thought_id;
        const thought = await Thought.findById(thought_id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            res.json(thought);
        }
    }
    catch (error) {
        console.error('Error fetching thought:', error);
        res.status(500).json({ message: 'Error fetching thought' });
    }
}
export async function createThoughtForUserById(req, res) {
    try {
        const { user_id, text } = req.body;
        const thought = await Thought.create({ text, username: user_id });
        const user = await User.findByIdAndUpdate(user_id, { $push: { thoughts: thought._id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.json({
                message: 'Thought added successfully',
                user: user
            });
        }
    }
    catch (error) {
        console.error('Error adding thought:', error);
        res.status(500).json({ message: 'Error adding thought' });
    }
}
export async function updateThoughtById(req, res) {
    try {
        const thought_id = req.params.thought_id;
        const thought = await Thought.findByIdAndUpdate(thought_id, req.body, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            res.json(thought);
        }
    }
    catch (error) {
        console.error('Error updating thought:', error);
        res.status(500).json({ message: 'Error updating thought' });
    }
}
export async function removeThoughtById(req, res) {
    try {
        const thought_id = req.params.thought_id;
        const thought = await Thought.findByIdAndDelete(thought_id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            res.json({ message: 'Thought deleted successfully' });
        }
    }
    catch (error) {
        console.error('Error deleting thought:', error);
        res.status(500).json({ message: 'Error deleting thought' });
    }
}
export async function createReactionForThought(req, res) {
    try {
        const { thought_id, reactionBody, username } = req.body;
        const thought = await Thought.findByIdAndUpdate(thought_id, { $push: { reactions: { reactionBody, username } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            res.json({
                message: 'Reaction added successfully',
                thought: thought
            });
        }
    }
    catch (error) {
        console.error('Error adding reaction:', error);
        res.status(500).json({ message: 'Error adding reaction' });
    }
}
export async function removeReactionFromThoughtByReactionId(req, res) {
    try {
        const { thought_id, reaction_id } = req.body;
        const thought = await Thought.findByIdAndUpdate(thought_id, { $pull: { reactions: { _id: reaction_id } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            res.json({
                message: 'Reaction removed successfully',
                thought: thought
            });
        }
    }
    catch (error) {
        console.error('Error removing reaction:', error);
        res.status(500).json({ message: 'Error removing reaction' });
    }
}

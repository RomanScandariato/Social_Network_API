import { Router } from 'express';
import { getAllUsers
// getUserById
// createNewUser
// updateUserById
// deleteUserById
// addFriendToUserFriendList
// removeFriendFromUserFriendList
// getAllThoughts
// getSingleThoughtById
// createThoughtForUserById
// updateThoughtById
// removeThoughtById
// createReactionForThought
// removeReactionFromThoughtByReactionId
 } from '../controllers/api_controller.js';
const router = Router();
router.get('/users', getAllUsers);
// router.get('/users:user_id', getUserById);
// router.post('/users/create', createNewUser);
// router.put('/users/update:user_id', updateUserById);
// router.delete('/users/delete:user_id', deleteUserById);
// router.post('/users/:userId/friends/:friends_id', addFriendToUserFriendList);
// router.delete('/users/:userId/friends/remove/:friends_id', removeFriendFromUserFriendList);
// router.get('/thoughts', getAllThoughts);
// router.get('/thoughts:user_id', getSingleThoughtById);
// router.post('/thoughts/create:user_id', createThoughtForUserById);
// router.put('/thoughts/update:user_id', updateThoughtById);
// router.delete('/thoughts/delete:user_id', removeThoughtById);
// router.post('/api/thoughts/:thought_id/reactions/create', createReactionForThought);
// router.delete('/api/thoughts/:thought_id/reactions/remove:reactionId', removeReactionFromThoughtByReactionId);
export default router;

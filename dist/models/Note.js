import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    _id: false
});
const noteSchema = new Schema({
    text: {
        type: String,
        minLength: [3, 'Your note text must be at least characters in length']
    },
    user: {
        type: Schema.Types.ObjectId,
        // This is a reference to the model name you delcared in the user model file through model('User', userSchema)
        ref: 'User'
    },
    likes: [likeSchema]
});
const Note = model('Note', noteSchema);
export default Note;

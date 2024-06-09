// Public
import { Schema, models, model } from 'mongoose';

const noteSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    note_title: {
        type: String,
        required: true,
    },
    note_content: {
        type: String,
        required: true,
    },
    note_color: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const StickyNote = models?.StickyNote || model('StickyNote', noteSchema);

export default StickyNote;

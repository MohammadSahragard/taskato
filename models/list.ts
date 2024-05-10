// public
import { Schema, models, model } from 'mongoose';

const listSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    list_title: {
        type: String,
        required: true,
    },
    list_color: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const List = models?.List || model('List', listSchema);

export default List;

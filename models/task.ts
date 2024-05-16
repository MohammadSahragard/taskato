// public
import { Schema, models, model } from 'mongoose';

const taskSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    task_title: {
        type: String,
        required: true,
    },
    task_description: {
        type: String,
    },
    task_due_date: {
        type: Date,
    },
    task_list: {
        type: String,
    },
    task_reminder_date: {
        type: Date,
    },
    task_complete: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const Task = models?.Task || model('Task', taskSchema);

export default Task;

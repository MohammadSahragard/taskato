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
    task_description: String,
    task_due_date: Date,
    task_list: {
        list_title: String,
        list_color: String,
    },
    task_reminder_date: {
        time: {
            hour: Number,
            minute: Number,
        },
        date: Date,
        isTrueReminder: Boolean,
    },
    subtasks: [
        {
            subtask_title: {
                type: String,
                required: true,
            },
            subtask_completion: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
    ],
    task_completion: {
        type: Boolean,
        required: true,
        default: false,
    },
    is_in_favorite: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const Task = models?.Task || model('Task', taskSchema);

export default Task;

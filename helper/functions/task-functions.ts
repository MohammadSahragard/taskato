// public
import {
    AddTaskListTypes,
    TaskContent,
    selectedTaskTypes,
} from '@/types/types';

//* add task list
export const addTaskList = async ({
    email,
    listTitle,
    listColor,
}: AddTaskListTypes) => {
    // form validation
    if (!email || !listTitle || !listColor) {
        return {
            message: 'All fields are required!',
            status: 401,
        };
    }

    // post data
    const res = await fetch('/api/task-lists/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            list_title: listTitle,
            list_color: listColor,
        }),
    });
    const data = await res.json();

    return data;
};

//* rename task list
export const renameTaskList = async (id: string, listTitle: string) => {
    // form validation
    if (!id || !listTitle) {
        return {
            message: 'Something went wrong. Please try again later.',
            status: 401,
        };
    }

    // put data
    const res = await fetch('/api/task-lists/list', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, list_title: listTitle }),
    });
    const data = await res.json();

    return data;
};

//* add task
export const addTask = async (taskData: TaskContent, userEmail: string) => {
    // data
    const { taskTitle, taskDate, taskList, taskReminder } = taskData;

    // form validation
    if (!taskTitle) {
        return {
            message: 'Please enter a task title!',
            status: 401,
        };
    }

    // req data
    const reqData: any = {
        task_title: taskTitle || '',
        task_description: '',
        task_due_date: taskDate || null,
        task_list: taskList || {},
        task_reminder_date: taskReminder || {},
    };

    // post data
    const res = await fetch('/api/user-tasks/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reqData, userEmail }),
    });
    const data = await res.json();

    return data;
};

//* update task
export const updateTask = async (taskData: selectedTaskTypes) => {
    // data
    const {
        _id,
        task_title,
        task_description,
        task_due_date,
        task_list,
        task_reminder_date,
    } = taskData;

    // req data
    const reqData: any = {
        task_title: task_title || '',
        task_description: task_description || '',
        task_due_date: task_due_date || null,
        task_list: task_list || {},
        task_reminder_date: task_reminder_date || {},
    };

    // form validation
    if (!task_title) {
        return {
            message: 'Task title is required, please enter a title.',
            status: 401,
        };
    }

    // put data
    const res = await fetch('/api/user-tasks/task', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, reqData }),
    });
    const data = await res.json();

    return data;
};

//* add subtask
export const addSubtask = async (_id: string, subtask_title: string) => {
    const reqData: any = {
        $push: {
            subtasks: {
                subtask_title,
            },
        },
    };

    // form validation
    if (!subtask_title) {
        return {
            message: 'Subtask title is required, please enter a title.',
            status: 401,
        };
    }

    // post data
    const res = await fetch('/api/user-tasks/task', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, reqData }),
    });
    const data = await res.json();

    return data;
};

//* delete subtask
export const deleteSubtask = async (_id: string) => {
    const reqData: any = {
        $pull: {
            subtasks: {
                _id,
            },
        },
    };

    // put data
    const res = await fetch('/api/user-tasks/subtask', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, reqData }),
    });
    const data = await res.json();

    return data;
};

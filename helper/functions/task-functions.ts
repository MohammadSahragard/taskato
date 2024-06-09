// Types
import { AddTaskListTypes, TaskContentTypes } from '@/types/types';

// Functions
import {
    convertTitleToPathname,
    dateToLocalDateString,
    getDate,
} from './functions';

//* Adding a task list
export const addTaskList = async ({
    email,
    list_title,
    list_color,
}: AddTaskListTypes) => {
    // Form validation
    if (!email || !list_title || !list_color) {
        return {
            message: 'All fields are required!',
            status: 401,
        };
    }

    // Post data
    const res = await fetch('/api/task-lists/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            list_title,
            list_color,
        }),
    });
    const data = await res.json();

    return data;
};

//* Renaming a task list
export const renameTaskList = async (
    email: string,
    _id: string,
    list_title: string
) => {
    // Form validation
    if (!_id || !list_title) {
        return {
            message: 'Something went wrong. Please try again later.',
            status: 401,
        };
    }

    // Put data
    const res = await fetch('/api/task-lists/list', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, _id, list_title }),
    });
    const data = await res.json();

    return data;
};

//* Adding a task
export const addTask = async (
    taskData: TaskContentTypes,
    userEmail: string,
    fullPathname: string,
    lists: any
) => {
    // Variables
    const pathname = fullPathname.split('/').slice(-1)[0];
    const { task_title, task_due_date, task_list, task_reminder_date } =
        taskData;

    // Form validation
    if (!task_title) {
        return {
            message: 'Please enter a task title!',
            status: 401,
        };
    }

    // Req data
    const reqData: any = {
        task_title,
        task_description: '',
        task_due_date,
        task_list,
        task_reminder_date,
    };

    //---- Adding tasks depending on the route
    // Due date
    if (pathname === 'today') {
        reqData.task_due_date = getDate().today;
    }
    // List
    if (fullPathname.includes('list')) {
        const foundList = lists?.find(
            (list: any) => convertTitleToPathname(list.list_title) === pathname
        );

        reqData.task_list = {
            list_title: foundList.list_title,
            list_color: foundList.list_color,
        };
    }
    // Important
    if (pathname === 'important') {
        reqData.is_in_important = true;
    }

    // Post data
    const res = await fetch('/api/user-tasks/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reqData, userEmail }),
    });
    const data = await res.json();

    return data;
};

//* Updating a task
export const updateTask = async (taskData: TaskContentTypes) => {
    // Variables
    const {
        _id,
        task_title,
        task_description,
        task_due_date,
        task_list,
        task_reminder_date,
    } = taskData;

    // Req data
    const reqData: any = {
        task_title,
        task_description,
        task_due_date,
        task_list,
        task_reminder_date,
    };

    // Form validation
    if (!task_title) {
        return {
            message: 'Task title is required, please enter a title.',
            status: 401,
        };
    }

    // Put data
    const res = await fetch('/api/user-tasks/task', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, reqData }),
    });
    const data = await res.json();

    return data;
};

//* Adding a subtask
export const addSubtask = async (_id: string, subtask_title: string) => {
    // Req data
    const reqData: any = {
        $push: {
            subtasks: {
                subtask_title,
            },
        },
    };

    // Form validation
    if (!subtask_title) {
        return {
            message: 'Subtask title is required, please enter a title.',
            status: 401,
        };
    }

    // Post data
    const res = await fetch('/api/user-tasks/task', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, reqData }),
    });
    const data = await res.json();

    return data;
};

//* Deleting a subtask
export const deleteSubtask = async (_id: string) => {
    // Req data
    const reqData: any = {
        $pull: {
            subtasks: {
                _id,
            },
        },
    };

    // Put data
    const res = await fetch('/api/user-tasks/subtask', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, reqData }),
    });
    const data = await res.json();

    return data;
};

//* Getting the tasks by pathname
export const getTasksByPathname = (tasks: any, pathname: string) => {
    switch (pathname) {
        case 'all':
            return tasks;
            break;

        case 'today':
            return tasks?.filter(
                (task: any) =>
                    dateToLocalDateString(new Date(task.task_due_date)) ===
                    dateToLocalDateString(new Date())
            );
            break;

        case 'important':
            return tasks?.filter((task: any) => task.is_in_important);
            break;

        default:
            return tasks?.filter(
                (task: any) =>
                    convertTitleToPathname(task.task_list.list_title) ===
                    convertTitleToPathname(pathname)
            );
            break;
    }
};

// types
import {
    AddTaskListTypes,
    TaskContent,
    selectedTaskTypes,
} from '@/types/types';

// needed functions
import {
    convertTitleToPathname,
    dateToLocalDateString,
    getDate,
} from './functions';

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
export const addTask = async (
    taskData: TaskContent,
    userEmail: string,
    fullPathname: string,
    lists: any
) => {
    // variables
    const pathname = fullPathname.split('/').slice(-1)[0];

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

    //---- Adding tasks depending on the route
    // due date
    if (pathname === 'today') {
        reqData.task_due_date = getDate().today;
    }
    // list
    if (fullPathname.includes('list')) {
        const foundList = lists?.find(
            (list: any) => convertTitleToPathname(list.list_title) === pathname
        );

        reqData.task_list = {
            list_title: foundList.list_title,
            list_color: foundList.list_color,
        };
    }
    // important
    if (pathname === 'important') {
        reqData.is_in_important = true;
    }

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

//* get tasks by pathname
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

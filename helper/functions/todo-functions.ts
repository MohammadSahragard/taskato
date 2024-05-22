// public
import { AddTaskListTypes, TodoContent } from '@/types/types';

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

    // post form data
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

    // post form data
    const res = await fetch('/api/task-lists/list', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, list_title: listTitle }),
    });
    const data = await res.json();

    return data;
};

//* add task
export const addTask = async (taskData: TodoContent, userEmail: string) => {
    // data
    const {
        taskTitle,
        taskDescription,
        taskDate,
        taskList,
        taskReminder,
        taskSubtasks,
    } = taskData;

    const reqData: any = {
        task_title: taskTitle,
    };

    // form validation
    if (!taskTitle) {
        return {
            message: `Please enter a task title!`,
            status: 401,
        };
    }

    // to complete request body
    taskDate && (reqData.task_due_date = taskDate);
    taskList && (reqData.task_list = taskList);
    taskReminder?.isTrueReminder && (reqData.task_reminder_date = taskReminder);

    // post form data
    const res = await fetch('/api/user-tasks/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reqData, userEmail }),
    });
    const data = await res.json();

    return data;
};

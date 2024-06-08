// public
import List from '@/models/list';
import Task from '@/models/task';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';
// functions
import { convertPathnameToTitle } from '@/helper/functions/functions';

//* create list
export const POST = async (req: Request) => {
    // variables
    const { email, list_title, list_color } = await req.json();
    const trimmed_list_title = list_title.replace(/  +/g, ' ');

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    if (req.method !== 'POST')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // form validation
    if (!email || !list_title || !list_color) {
        return NextResponse.json({
            message: 'List title is required.',
            status: 401,
        });
    }

    // check if list already exists
    const list = await List.findOne({
        list_title: trimmed_list_title.toLowerCase(),
        email,
    });
    if (list) {
        return NextResponse.json({
            message: 'The list already exists!',
            status: 400,
        });
    }
    // Checking if a route with this name exists
    const checkingRoute = await List.findOne({
        list_title: convertPathnameToTitle(trimmed_list_title),
        email,
    });
    if (checkingRoute) {
        return NextResponse.json({
            message: 'This route is already reserved for a list.',
            status: 400,
        });
    }

    // create new list
    try {
        await List.create({
            email,
            list_title: trimmed_list_title.toLowerCase(),
            list_color,
        });
        return NextResponse.json({
            message: 'The list was created successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* update list
export const PUT = async (req: Request) => {
    // variables
    const { email, _id, list_title } = await req.json();
    const trimmed_list_title = list_title.replace(/  +/g, ' ');

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    if (req.method !== 'PUT')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // form validation
    if (!_id || !list_title) {
        return NextResponse.json({
            message: 'List title is required.',
            status: 401,
        });
    }

    // check if list don't exists
    const list = await List.findOne({ _id });
    if (!list) {
        return NextResponse.json({
            message: "List don't exists!",
            status: 400,
        });
    }

    // check if list already exists
    const listChecking = await List.findOne({
        list_title: trimmed_list_title.toLowerCase(),
        email,
    });
    if (listChecking) {
        return NextResponse.json({
            message: 'The list already exists!',
            status: 400,
        });
    }
    // Checking if a route with this name exists
    const checkingRoute = await List.findOne({
        list_title: convertPathnameToTitle(trimmed_list_title),
        email,
    });
    if (checkingRoute) {
        return NextResponse.json({
            message: 'This route is already reserved for a list.',
            status: 400,
        });
    }

    // update list
    try {
        // checking if list has some tasks
        const taskList = await Task.find({
            'task_list.list_title': list.list_title,
        });
        const haveTask = taskList.length ? true : false;

        // updating list and it tasks
        await List.updateOne(
            { _id },
            { list_title: trimmed_list_title.toLowerCase() }
        );
        if (haveTask) {
            await Task.updateMany(
                { 'task_list.list_title': list.list_title },
                { 'task_list.list_title': trimmed_list_title }
            );
        }

        return NextResponse.json({
            message: 'The list was updated successfully.',
            status: 200,
            haveTask,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* delete list
export const DELETE = async (req: Request) => {
    // variables
    const { id } = await req.json();

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    if (req.method !== 'DELETE')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // id validation
    if (!id) {
        return NextResponse.json({
            message: 'ID not found',
            status: 401,
        });
    }

    // check if list don't exists
    const list = await List.findOne({ _id: id });
    if (!list) {
        return NextResponse.json({
            message: "List don't exists!",
            status: 400,
        });
    }

    // delete list
    try {
        // checking if list has some tasks
        const taskList = await Task.find({
            'task_list.list_title': list.list_title,
        });
        const haveTask = taskList.length ? true : false;

        // deleting list and it tasks
        await List.deleteOne({ _id: id });
        if (haveTask) {
            await Task.deleteMany({ 'task_list.list_title': list.list_title });
        }

        return NextResponse.json({
            message: 'The list was deleted successfully.',
            status: 200,
            haveTask,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

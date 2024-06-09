// Public
import List from '@/models/list';
import Task from '@/models/task';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

// Functions
import { convertPathnameToTitle } from '@/helper/functions/functions';

//* Creating a list
export const POST = async (req: Request) => {
    // Variables
    const { email, list_title, list_color } = await req.json();
    const trimmed_list_title = list_title.replace(/  +/g, ' ');

    if (req.method !== 'POST')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // Database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    // Form validation
    if (!email || !list_title || !list_color) {
        return NextResponse.json({
            message: 'The list title is required!',
            status: 401,
        });
    }

    // Checking if the list already exists or not
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
    // Checking if a route with this name exists or not
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

    // Creating a new list
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

//* Updating a list
export const PUT = async (req: Request) => {
    // Variables
    const { email, _id, list_title } = await req.json();
    const trimmed_list_title = list_title.replace(/  +/g, ' ');

    if (req.method !== 'PUT')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // Database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    // Form validation
    if (!_id || !list_title) {
        return NextResponse.json({
            message: 'The list title is required!',
            status: 401,
        });
    }

    // Checking if the list exists for updating or not
    const list = await List.findOne({ _id });
    if (!list) {
        return NextResponse.json({
            message: "List don't exists!",
            status: 400,
        });
    }

    // Checking if the list already exists or not
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

    // Updating the list
    try {
        // Checking if the list has some tasks or not
        const taskList = await Task.find({
            'task_list.list_title': list.list_title,
        });
        const haveTask = taskList.length ? true : false;

        // Updating the list and its tasks
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

//* Deleting a list
export const DELETE = async (req: Request) => {
    // Variables
    const { id } = await req.json();

    if (req.method !== 'DELETE')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // Database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    // ID validation
    if (!id) {
        return NextResponse.json({
            message: 'ID not found',
            status: 401,
        });
    }

    // Checking if the list exists for deleting or not
    const list = await List.findOne({ _id: id });
    if (!list) {
        return NextResponse.json({
            message: "The list doesn't exist!",
            status: 400,
        });
    }

    // Deleting the list
    try {
        // Checking if the list has some tasks or not
        const taskList = await Task.find({
            'task_list.list_title': list.list_title,
        });
        const haveTask = taskList.length ? true : false;

        // Deleting the list and its tasks
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

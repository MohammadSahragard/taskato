// public
import Task from '@/models/task';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

//* create task
export const POST = async (req: Request) => {
    const { reqData, userEmail } = await req.json();

    if (req.method !== 'POST') return;

    // form validation
    if (!reqData.task_title) {
        return NextResponse.json({
            message: 'Please enter a task title!',
            status: 401,
        });
    }

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    // create new list
    try {
        await Task.create({
            email: userEmail,
            ...reqData,
        });
        return NextResponse.json({
            message: `The task was created successfully.`,
            status: 200,
        });
    } catch (err: any) {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* update task
export const PUT = async (req: any) => {
    // variables
    const { _id, reqData } = await req.json();

    if (req.method !== 'PUT')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    // check if list don't exists
    const task = await Task.findOne({ _id });
    if (!task) {
        return NextResponse.json({
            message: "Task don't exists!",
            status: 400,
        });
    }

    // update list
    try {
        await Task.updateOne({ _id }, { ...reqData });
        return NextResponse.json({
            message: `The Task was updated successfully.`,
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* delete task
export const DELETE = async (req: any) => {
    // variables
    const { _id } = await req.json();

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
    if (!_id) {
        return NextResponse.json({
            message: 'ID not found',
            status: 401,
        });
    }

    // check if task don't exists
    const task = await Task.findOne({ _id });
    if (!task) {
        return NextResponse.json({
            message: "Task don't exists!",
            status: 400,
        });
    }

    // delete task
    try {
        await Task.deleteOne({ _id });
        return NextResponse.json({
            message: 'The task was deleted successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

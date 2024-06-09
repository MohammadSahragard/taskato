// Public
import Task from '@/models/task';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

//* Creating a task
export const POST = async (req: Request) => {
    const { reqData, userEmail } = await req.json();

    if (req.method !== 'POST') return;
    
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
    if (!reqData.task_title) {
        return NextResponse.json({
            message: 'Please enter a task title!',
            status: 401,
        });
    }

    // Creating a new task
    try {
        await Task.create({
            email: userEmail,
            ...reqData,
        });
        return NextResponse.json({
            message: 'The task was created successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* Updating a task
export const PUT = async (req: Request) => {
    // Variables
    const { _id, reqData } = await req.json();

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

    // Checking if the task exists for updating or not
    const task = await Task.findOne({ _id });
    if (!task) {
        return NextResponse.json({
            message: "The task doesn't exists!",
            status: 400,
        });
    }

    // Updating the task
    try {
        await Task.updateOne({ _id }, { ...reqData });
        const updatedTask = await Task.findOne({ _id });

        return NextResponse.json({
            message: 'The Task was updated successfully.',
            status: 200,
            data: updatedTask,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* Deleting a task
export const DELETE = async (req: Request) => {
    // Variables
    const { _id } = await req.json();

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
    if (!_id) {
        return NextResponse.json({
            message: 'ID not found!',
            status: 401,
        });
    }

    // Checking if the task exists for deleting or not
    const task = await Task.findOne({ _id });
    if (!task) {
        return NextResponse.json({
            message: "The task doesn't exists!",
            status: 400,
        });
    }

    // Deleting the task
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

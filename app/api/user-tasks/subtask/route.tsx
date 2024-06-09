// Public
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';
import Task from '@/models/task';

//* Updating a subtask
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

    // Checking if the subtask exists for updating or not
    const subtask = await Task.findOne({ 'subtasks._id': _id });
    if (!subtask) {
        return NextResponse.json({
            message: "Subtask don't exists!",
            status: 400,
        });
    }

    // Updating the subtask
    try {
        await Task.updateOne({ 'subtasks._id': _id }, { ...reqData });
        const updatedTask = await Task.findOne({ 'subtasks._id': _id });
        return NextResponse.json({
            message: 'The subtask was updated successfully.',
            status: 200,
            data: updatedTask.subtasks,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* Deleting a subtask
export const DELETE = async (req: Request) => {
    // Variables
    const { _id, reqData } = await req.json();

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

    // Checking if the subtask exists for deleting or not
    const subtask = await Task.findOne({ 'subtasks._id': _id });
    if (!subtask) {
        return NextResponse.json({
            message: "Subtask don't exists!",
            status: 400,
        });
    }

    // Deleting the subtask
    try {
        await Task.updateOne({ 'subtasks._id': _id }, { ...reqData });
        const updatedTask = await Task.findOne({ _id: subtask._id });

        return NextResponse.json({
            message: 'The subtask was deleted successfully.',
            status: 200,
            data: updatedTask.subtasks,
        });
    } catch (error: any) {
        return NextResponse.json({
            message: `Something went wrong. Please try again later. (here: ${error})`,
            status: 500,
        });
    }
};

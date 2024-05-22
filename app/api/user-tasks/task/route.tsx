// public
import Task from '@/models/task';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

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

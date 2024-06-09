// Public
import Task from '@/models/task';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    // Variables
    const { email } = await req.json();

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

    if (!email)
        return NextResponse.json({
            message: "The email doesn't exist.",
            status: 401,
        });

    // Getting all lists
    try {
        const lists = await Task.find({ email });

        return NextResponse.json({
            data: lists,
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }
};

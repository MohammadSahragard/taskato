// public
import StickyNote from '@/models/sticky-note';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

//* create task
export const POST = async (req: Request) => {
    const { reqData, userEmail } = await req.json();

    if (req.method !== 'POST') return;

    // form validation
    if (!reqData.note_title) {
        return NextResponse.json({
            message: 'Please enter a note title!',
            status: 401,
        });
    }

    if (!reqData.note_content) {
        return NextResponse.json({
            message: 'Please enter the content of your note!',
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

    // create new task
    try {
        await StickyNote.create({
            email: userEmail,
            ...reqData,
        });
        return NextResponse.json({
            message: 'The note was created successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

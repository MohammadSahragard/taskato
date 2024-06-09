// Public
import StickyNote from '@/models/sticky-note';
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

    // Getting all notes
    try {
        const notes = await StickyNote.find({ email });

        return NextResponse.json({
            data: notes,
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }
};

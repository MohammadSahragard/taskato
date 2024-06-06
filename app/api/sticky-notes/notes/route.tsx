// public
import StickyNote from '@/models/sticky-note';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
    // variables
    const { email } = await req.json();

    if (req.method !== 'POST')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    if (!email)
        return NextResponse.json({
            message: 'Email is required.',
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

    // get lists
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

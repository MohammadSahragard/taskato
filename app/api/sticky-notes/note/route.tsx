// Public
import StickyNote from '@/models/sticky-note';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

//* Creating a note
export const POST = async (req: Request) => {
    const { reqData, userEmail } = await req.json();

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

    // Creating a new note
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

//* Updating a note
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

    // Checking if the note exists for updating or not
    const note = await StickyNote.findOne({ _id });
    if (!note) {
        return NextResponse.json({
            message: "The note doesn't exist!",
            status: 400,
        });
    }

    // Updating the note
    try {
        await StickyNote.updateOne({ _id }, { ...reqData });

        return NextResponse.json({
            message: 'The note was updated successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* Deleting a note
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

    // Checking if the note exists for deleting or not
    const note = await StickyNote.findOne({ _id });
    if (!note) {
        return NextResponse.json({
            message: "The note doesn't exist!",
            status: 400,
        });
    }

    // Delete the note
    try {
        await StickyNote.deleteOne({ _id });
        return NextResponse.json({
            message: 'The note was deleted successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

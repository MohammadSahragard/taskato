// public
import StickyNote from '@/models/sticky-note';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

//* create note
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

    // create new note
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

//* update note
export const PUT = async (req: Request) => {
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

    // check if note don't exists
    const note = await StickyNote.findOne({ _id });
    if (!note) {
        return NextResponse.json({
            message: "Note don't exists!",
            status: 400,
        });
    }

    // update note
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

//* delete note
export const DELETE = async (req: Request) => {
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

    // check if note don't exists
    const note = await StickyNote.findOne({ _id });
    if (!note) {
        return NextResponse.json({
            message: "Note don't exists!",
            status: 400,
        });
    }

    // delete note
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

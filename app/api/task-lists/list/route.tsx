// public
import List from '@/models/list';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

//* create list
export const POST = async (req: any) => {
    // variables
    const { email, list_title, list_color } = await req.json();

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    if (req.method !== 'POST') return;

    // form validation
    if (!email || !list_title || !list_color) {
        return NextResponse.json({
            message: 'All fields are required!',
            status: 401,
        });
    }

    // check if list already exists
    const list = await List.findOne({ list_title, email });
    if (list) {
        return NextResponse.json({
            message: 'List already exists!',
            status: 400,
        });
    }

    // create new list
    try {
        await List.create({
            email,
            list_title,
            list_color,
        });
        return NextResponse.json({
            message: `The list was created successfully.`,
            status: 200,
        });
    } catch (err: any) {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* delete list
export const DELETE = async (req: any) => {
    // variables
    const { id } = await req.json();

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    if (req.method !== 'DELETE') return;

    // id validation
    if (!id) {
        return NextResponse.json({
            message: 'ID not found',
            status: 401,
        });
    }

    // check if list don't exists
    const list = await List.findOne({ _id: id });
    if (!list) {
        return NextResponse.json({
            message: "List don't exists!",
            status: 400,
        });
    }

    // delete list
    try {
        await List.deleteOne({ _id: id });
        return NextResponse.json({
            message: `The list was deleted successfully.`,
            status: 200,
        });
    } catch (err: any) {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* update list
export const PUT = async (req: any) => {
    // variables
    const { _id, list_title } = await req.json();

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    if (req.method !== 'PUT') return;

    // form validation
    if (!_id || !list_title) {
        return {
            message: 'Something went wrong. Please try again later.',
            status: 401,
        };
    }

    // check if list don't exists
    const list = await List.findOne({ _id });
    if (!list) {
        return NextResponse.json({
            message: "List don't exists!",
            status: 400,
        });
    }

    // delete list
    try {
        await List.updateOne({ _id }, { list_title });
        return NextResponse.json({
            message: `The list was updated successfully.`,
            status: 200,
        });
    } catch (err: any) {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

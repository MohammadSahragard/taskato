// public
import List from '@/models/list';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

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
    const list = await List.findOne({ list_title });
    if (list) {
        return NextResponse.json({
            message: 'List already exists!',
            status: 400,
        });
    }

    // create new user
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

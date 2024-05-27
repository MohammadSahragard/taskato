// public
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const DELETE = async (req: any) => {
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

    // check if task don't exists
    const task = await Task.findOne({ _id });
    if (!task) {
        return NextResponse.json({
            message: "Subtask don't exists!",
            status: 400,
        });
    }

    // delete task
    try {
        await Task.deleteOne({ _id });
        return NextResponse.json({
            message: 'The task was deleted successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

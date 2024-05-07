// public
import { hashPassword } from '@/helper/functions/auth-functions';
import User from '@/models/user';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
    // variables
    const { firstName, lastName, email, password, confirmPassword } =
        await req.json();

    const hashedPass = await hashPassword(password);

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
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return NextResponse.json({
            message: 'All fields are required!',
            status: 401,
        });
    }

    if (password !== confirmPassword) {
        return NextResponse.json({
            message: "Passwords don't match!",
            status: 401,
        });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return NextResponse.json({
            message: 'Invalid e-mail address format!',
            status: 403,
        });
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        return NextResponse.json({
            message:
                'Password must be at least 8 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters.',
            status: 403,
        });
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        return NextResponse.json({
            message: 'User already exists!',
            status: 400,
        });
    }

    // create new user
    try {
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPass,
        });
        return NextResponse.json({
            message:
                'Thanks for signing up. Welcome to our application.',
            status: 200,
        });
    } catch (err: any) {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

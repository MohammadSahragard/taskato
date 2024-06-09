// Public
import { hashPassword } from '@/helper/functions/auth-functions';
import User from '@/models/user';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    // Variables
    const { firstName, lastName, email, password, confirmPassword } =
        await req.json();
    const hashedPass = await hashPassword(password);

    // Database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    if (req.method !== 'POST')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // form validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return NextResponse.json({
            message: 'All fields are required!',
            status: 401,
        });
    }

    if (password !== confirmPassword) {
        return NextResponse.json({
            message: "The Passwords don't match together!",
            status: 401,
        });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return NextResponse.json({
            message: 'Invalid email address format!',
            status: 403,
        });
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        return NextResponse.json({
            message:
                'The password must be at least 8 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters.',
            status: 403,
        });
    }

    // Checking if the user already exists or not
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
        return NextResponse.json({
            message: 'The user already exists!',
            status: 400,
        });
    }

    // Creating a new user
    try {
        await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPass,
        });
        return NextResponse.json({
            message: `Thanks for signing up, ${firstName}. Welcome to our application.`,
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

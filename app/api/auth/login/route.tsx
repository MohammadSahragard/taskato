// Public
import { verifyPassword } from '@/helper/functions/auth-functions';
import User from '@/models/user';
import connectDB from '@/utils/connectDB';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    // Variables
    const { email, password } = await req.json();
    const secretKey: any = process.env.SECRET_KEY;

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

    // Form validation
    if (!email || !password) {
        return NextResponse.json({
            message: 'All fields are required!',
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
    if (!user) {
        return NextResponse.json({
            message: "The user doesn't exist!",
            status: 400,
        });
    }

    // Checking if the password is correct or not
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
        return NextResponse.json({
            message: 'The username or the password is incorrect.',
            status: 401,
        });
    }

    // Special token generation
    const expirationToken = 24 * 7 * 60 * 60;
    const token = sign({ email: email.toLowerCase() }, secretKey, {
        expiresIn: expirationToken,
    });

    // Setting the token to cookies
    try {
        const response = NextResponse.json({
            message: 'You logged in successfully.',
            status: 200,
        });
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            maxAge: expirationToken,
            path: '/',
        });

        return response;
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

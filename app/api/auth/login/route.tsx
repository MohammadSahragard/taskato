// public
import { verifyPassword } from '@/helper/functions/auth-functions';
import User from '@/models/user';
import connectDB from '@/utils/connectDB';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    // variables
    const { email, password } = await req.json();
    const secretKey: any = process.env.SECRET_KEY;

    // database connection
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
    if (!email || !password) {
        return NextResponse.json({
            message: 'All fields are required!',
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

    // check if user don't exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        return NextResponse.json({
            message: "User don't exists!",
            status: 400,
        });
    }

    // checking if password is correct
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
        return NextResponse.json({
            message: 'Username or password is incorrect.',
            status: 401,
        });
    }

    // generate token
    const expirationToken = 24 * 7 * 60 * 60;
    const token = sign({ email: email.toLowerCase() }, secretKey, {
        expiresIn: expirationToken,
    });

    // create new user
    try {
        // return token
        const response = NextResponse.json({
            message: 'Logged in successfully.',
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

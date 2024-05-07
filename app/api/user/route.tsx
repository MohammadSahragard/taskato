// public
import { cookies } from 'next/headers';
import User from '@/models/user';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/helper/functions/auth-functions';

export const GET = async (req: any) => {
    // variables
    const cookiesStore = cookies();
    const token: any = cookiesStore.get('token')?.value;
    const secretKey: any = process.env.SECRET_KEY;
    const verifiedToken: any = verifyToken(token, secretKey);

    if (req.method !== 'GET')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    if (!token)
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    if (!verifiedToken)
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

    // get user
    try {
        const foundUser = await User.findOne({ email: verifiedToken });

        return NextResponse.json({
            message: {
                name: `${foundUser.firstName} ${foundUser.lastName}`,
                email: foundUser.email,
            },
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }
};

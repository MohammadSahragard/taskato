// public
import { NextResponse } from 'next/server';

export const GET = (req: any) => {
    if (req.method === 'GET') {
        const response = NextResponse.json({
            message: 'Log out successfully!',
            status: 200,
        });
        response.cookies.delete('token');
        return response;
    } else {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }
};

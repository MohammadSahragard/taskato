// Public
import { NextResponse } from 'next/server';

export const GET = (req: Request) => {
    if (req.method === 'GET') {
        const response = NextResponse.json({
            message: 'You logged out successfully!',
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

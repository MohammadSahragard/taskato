// Public
import { hash, compare } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

// Types
import {
    IsUserLoggedInTypes,
    LoginSubmitTypes,
    SignupSubmitTypes,
} from '@/types/types';

//* Creating hashed password
export const hashPassword = async (password: string) => {
    if (!password) return;
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
};

//* Verifying password (comparing user hashed pass to entered pass)
export const verifyPassword = async (
    password: string,
    hashedPassword: string
) => {
    if (!password || !hashedPassword) return;
    const isValid = await compare(password, hashedPassword);
    return isValid;
};

//* Verifying token
export const verifyToken = (token: string, secretKey: any) => {
    try {
        const result: any = verify(token, secretKey);
        return result.email;
    } catch (error) {
        return false;
    }
};

//* Checking authentication
export const checkingAuth = async (cookies: any) => {
    // Getting token from request header
    const token: string = cookies.get('token')?.value ?? null;
    const secretKey: any = process.env.SECRET_KEY;

    if (!token) return false;

    const verifiedToken: any = verifyToken(token, secretKey);

    // Getting result
    if (!verifiedToken) {
        return false;
    } else {
        return true;
    }
};

//* Submitting of sign up form
export const signupSubmit = async (signupProps: SignupSubmitTypes) => {
    // Variables
    const { firstName, lastName, email, password, confirmPassword } =
        signupProps;

    // Form validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return {
            message: 'All fields required!',
            status: 401,
        };
    }

    if (password !== confirmPassword) {
        return {
            message: "Passwords don't match!",
            status: 401,
        };
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return {
            message: 'Invalid e-mail address format!',
            status: 403,
        };
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        return {
            message:
                'Password must be at least 8 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters.',
            status: 403,
        };
    }

    // Post data
    try {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            }),
        });

        const result = await res.json();
        return result;
    } catch {
        return {
            message: 'Something went wrong. Please try again later.',
            status: 401,
        };
    }
};

//* Submitting of login form
export const loginSubmit = async (loginProps: LoginSubmitTypes) => {
    // Variables
    const { email, password } = loginProps;

    // Form validation
    if (!email || !password) {
        return {
            message: 'All fields required!',
            status: 401,
        };
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return {
            message: 'Invalid e-mail address format!',
            status: 403,
        };
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        return {
            message:
                'Password must be at least 8 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters.',
            status: 403,
        };
    }

    // Post data
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const result = await res.json();
        return result;
    } catch {
        return {
            message: 'Something went wrong. Please try again later.',
            status: 401,
        };
    }
};

//* Checking the user for redirect to the login page
export const isUserLoggedIn = ({
    condition,
    pathname,
    router,
}: IsUserLoggedInTypes) => {
    if (!condition) {
        if (pathname.includes('login') || pathname.includes('signup')) {
        } else {
            router?.replace('/auth/login');
        }
    } else {
        if (pathname.includes('login') || pathname.includes('signup')) {
            router?.replace('/');
        }
    }
};

// public
import { hash, compare } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

//& types
import {
    IsUserLoggedInTypes,
    LoginSubmitTypes,
    SignupSubmitTypes,
} from '@/types/types';

//* create hashed password
export const hashPassword = async (password: string) => {
    if (!password) return;
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
};

//* verify password (compare user hashed pass with entered pass)
export const verifyPassword = async (
    password: string,
    hashedPassword: string
) => {
    if (!password || !hashedPassword) return;
    const isValid = await compare(password, hashedPassword);
    return isValid;
};

//* verify token
export const verifyToken = (token: string, secretKey: any) => {
    try {
        const result: any = verify(token, secretKey);
        return result.email;
    } catch (error) {
        return false;
    }
};

//* checking authentication
export const checkingAuth = async (cookies: any) => {
    // get token from headers request
    const token: string = cookies.get('token')?.value ?? null;
    const secretKey: any = process.env.SECRET_KEY;

    if (!token) return false;

    const verifiedToken: any = verifyToken(token, secretKey);

    // get result
    if (!verifiedToken) {
        return false;
    } else {
        return true;
    }
};

//* sign up submit
export const signupSubmit = async (signupProps: SignupSubmitTypes) => {
    const { firstName, lastName, email, password, confirmPassword } =
        signupProps;

    // form validation
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

//* login submit
export const loginSubmit = async (loginProps: LoginSubmitTypes) => {
    const { email, password } = loginProps;

    // form validation
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

//* user checking for redirect to login page
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

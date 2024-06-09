'use client';

// Public
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch } from '@/redux/app/hook';

//* Functions
import { isUserLoggedIn } from '@/helper/functions/auth-functions';

//* Redux
import {
    setUserEmail,
    setUserLoading,
    setUserName,
} from '@/redux/features/options/optionsSlice';

export const useUserLoggedIn = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();
    // States and variables
    const [user, setUser] = useState<any>();

    // Getting the logged-in user's data
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('/api/user');
            const user = await res.json();
            dispatch(setUserLoading());
            const condition = user.status === 200;
            if (condition) {
                setUser(user);
                dispatch(setUserEmail(user?.message?.email ?? ''));
                dispatch(setUserName(user?.message?.name ?? ''));
            } else {
                setUser(false);
            }
            isUserLoggedIn({ condition, pathname, router });
        };

        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return user;
};

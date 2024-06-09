'use client';

// public
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch } from '@/redux/app/hook';

//* functions
import { isUserLoggedIn } from '@/helper/functions/auth-functions';

//* redux
import {
    setUserEmail,
    setUserLoading,
    setUserName,
} from '@/redux/features/options/optionsSlice';

export const useUserLoggedIn = () => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<any>();
    const router = useRouter();
    const pathname = usePathname();

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

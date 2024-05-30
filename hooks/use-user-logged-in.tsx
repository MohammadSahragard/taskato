'use client';

// public
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

//* functions
import { isUserLoggedIn } from '@/helper/functions/auth-functions';

//* redux
import { setUserEmail, setUserName } from '@/redux/features/optionsSlice';

export const useUserLoggedIn = (url: string) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<any>();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(url);
            const user = await res.json();
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
    }, [url]);

    return user;
};

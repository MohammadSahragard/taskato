'use client';

// public
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isUserLoggedIn } from '@/helper/functions/auth-functions';

export const useUserLoggedIn = (url: string) => {
    const [user, setUser] = useState<any>();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(url);
            const user = await res.json();
            const condition = user.status === 200;
            condition ? setUser(user) : setUser(false);
            isUserLoggedIn({ condition, pathname, router });
        };

        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return user;
};

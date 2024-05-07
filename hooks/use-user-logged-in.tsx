'use client';

// public
import { useState, useEffect } from 'react';

export const useUserLoggedIn = (url: string) => {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(url);
            const user = await res.json();
            user.status === 200 ? setUser(user) : setUser(false);
        };

        getUser();
    }, [url]);

    return user;
};

'use client';

// public
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// next ui provider
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// redux provider
import { Provider } from 'react-redux';
import store from '@/redux/app/store';

export function Providers({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const mainSection = document.querySelector('main');
        if (pathname.includes('auth')) {
            mainSection?.classList.remove('auth-page');
        } else {
            mainSection?.classList.add('auth-page');
        }
    }, [pathname]);

    return (
        <NextUIProvider>
            <NextThemesProvider
                attribute='class'
                defaultTheme='light'
            >
                <Provider store={store}>{children}</Provider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}

// app/providers.tsx
'use client';

// next ui provider
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// redux provider
import { Provider } from 'react-redux';
import store from '@/redux/app/store';

export function Providers({ children }: { children: React.ReactNode }) {
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

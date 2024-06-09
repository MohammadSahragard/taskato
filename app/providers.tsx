'use client';

//* Next ui provider
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

//* Redux provider
import { Provider } from 'react-redux';
import store from '@/redux/app/store';

//* Toastify container
import { ToastContainer } from 'react-toastify';

//* Data receiver
import DataReceiver from './data-receiver';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider
                attribute='class'
                defaultTheme='light'
            >
                <ToastContainer theme='colored' />
                <Provider store={store}>
                    <DataReceiver>{children}</DataReceiver>
                </Provider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}

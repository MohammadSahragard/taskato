import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        // main background
                        background: '#FAFAFA',
                        // important texts
                        foreground: '#1E2023',
                        primary: {
                            // sidebars background
                            100: '#F0F0F0',
                            // subtexts
                            200: '#999999',
                            // dividers
                            300: '#DDDDDD',
                        },
                    },
                },
                dark: {
                    colors: {
                        // main background
                        background: '#111315',
                        // important texts
                        foreground: '#F0F0F0',
                        primary: {
                            // sidebars background
                            100: '#151719',
                            // subtexts
                            200: '#999999',
                            // dividers
                            300: '#191B1D',
                        },
                    },
                },
            },
        }),
    ],
};
export default config;

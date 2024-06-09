//* Public
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

//* Providers
import { Providers } from './providers';

//* Font config
const inter = Inter({ subsets: ['latin'] });

//* Fontawesome
import '/FontAwesome.Pro.6.4.2/css/all.css';

//* Toastify styles
import 'react-toastify/dist/ReactToastify.css';

//* Components
import MenuContainer from '@/components/sidebars/menu/menu-container';
import MainHeader from '@/components/ui-kits/main-header';
import TaskAdderBar from '@/components/ui-kits/task-adder-bar';
import TaskDetails from '@/components/sidebars/task-details/task-details';
import LogoLoading from '@/components/logo-loading/logo-loading';
import ContextMenu from '@/components/context-menus/context-menu';

//* Metadata
export const metadata: Metadata = {
    title: 'Taskato',
    description: 'A task manager app for managing tasks, task and notes.',
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    {/* Main section */}
                    <main className='main-section'>{children}</main>

                    {/* Main header */}
                    <MainHeader />

                    {/* Task details bar */}
                    <TaskDetails />

                    {/* Task adder bar */}
                    <div className='task-adder-bar-con'>
                        <TaskAdderBar />
                    </div>

                    {/* Menu section */}
                    <MenuContainer />

                    {/* Preloading state (logo loading motion) */}
                    <LogoLoading />

                    {/* Context menu */}
                    <ContextMenu />
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;

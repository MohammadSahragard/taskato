//* public
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

//* provider
import { Providers } from './providers';

//* font config
const inter = Inter({ subsets: ['latin'] });

//* fontawesome
import '/FontAwesome.Pro.6.4.2/css/all.css';

//* toastify styles
import 'react-toastify/dist/ReactToastify.css';

//* components
import MenuContainer from '@/components/sidebars/menu/menu-container';
import MainHeader from '@/components/ui-kits/main-header';
import AddTaskBar from '@/components/ui-kits/add-task-bar';
import TaskDetails from '@/components/sidebars/task-details/task-details';
import LogoLoading from '@/components/ui-kits/logo-loading';

//* metadata
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
                    {/* main section */}
                    <main className='main-section'>{children}</main>

                    {/* main header */}
                    <MainHeader />

                    {/* task detail bar */}
                    <TaskDetails />

                    {/* task add bar section */}
                    <div className='task-bar-con'>
                        <AddTaskBar />
                    </div>

                    {/* menu section */}
                    <MenuContainer />

                    {/* preloading state (logo loading motion) */}
                    <LogoLoading />
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;

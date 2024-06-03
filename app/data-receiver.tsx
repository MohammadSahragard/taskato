'use client';

// public
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

//* hooks
import useUserLists from '@/hooks/use-user-lists';
import { useUserLoggedIn } from '@/hooks/use-user-logged-in';
import useUserTasks from '@/hooks/use-user-tasks';

const DataReceiver = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    // data receiver hooks
    const tasks = useUserTasks();
    const taskLists = useUserLists();
    const getUser = useUserLoggedIn();

    // states and variables
    const user = useSelector((state: any) => state.options);
    const pathnameAssessment = pathname.includes('auth');
    const isOpenedDetailsSidebar = useSelector(
        (state: any) => state.options.isOpenedDetailsSidebar
    );

    // condition classes
    const preloading = user.userLoading ? 'preloading' : '';
    const authPage = pathnameAssessment ? 'auth-page' : '';
    const detailsSidebar = isOpenedDetailsSidebar
        ? 'is-opened-details-sidebar'
        : '';
    const finallyClass = `main-container ${preloading} ${authPage} ${detailsSidebar}`;

    return <div className={finallyClass}>{children}</div>;
};

export default DataReceiver;

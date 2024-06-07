'use client';

// public
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* hooks
import useUserLists from '@/hooks/use-user-lists';
import { useUserLoggedIn } from '@/hooks/use-user-logged-in';
import useUserTasks from '@/hooks/use-user-tasks';
import useUserNotes from '@/hooks/use-user-notes';

//* redux
import { setIsOpenedMobileMenu } from '@/redux/features/optionsSlice';

const DataReceiver = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    // data receiver hooks
    const tasks = useUserTasks();
    const notes = useUserNotes();
    const taskLists = useUserLists();
    const getUser = useUserLoggedIn();

    // states and variables
    const options = useAppSelector((state) => state.options);
    const authPageAssessment = pathname.includes('auth');
    const stickyNotesAssessment =
        !pathname.includes('list') && pathname.includes('sticky-notes');
    const isOpenedDetailsSidebar = useAppSelector(
        (state) => state.options.isOpenedDetailsSidebar
    );

    // condition classes
    const preloading = options.userLoading ? 'preloading' : '';
    const authPage = authPageAssessment ? 'auth-page' : '';
    const notesPage = stickyNotesAssessment ? 'notes-page' : '';
    const detailsSidebar = isOpenedDetailsSidebar
        ? 'is-opened-details-sidebar'
        : '';
    const finallyClass = `main-container ${preloading} ${authPage} ${notesPage} ${detailsSidebar}`;

    // functions
    useEffect(() => {
        if (options.isOpenedMobileMenu) {
            dispatch(setIsOpenedMobileMenu(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return <div className={finallyClass}>{children}</div>;
};

export default DataReceiver;

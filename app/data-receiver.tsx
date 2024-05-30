'use client';

//* hooks
import useUserLists from '@/hooks/use-user-lists';
import { useUserLoggedIn } from '@/hooks/use-user-logged-in';
import useUserTasks from '@/hooks/use-user-tasks';

const DataReceiver = () => {
    const tasks = useUserTasks();
    const taskLists = useUserLists();
    const getUser = useUserLoggedIn('/api/user');

    return null;
};

export default DataReceiver;

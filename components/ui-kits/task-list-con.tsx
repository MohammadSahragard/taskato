'use client';

// public
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* redux
import { getListsByEmail } from '@/redux/features/taskListsSlice';
import Icon from '../ui/texts/icon';
import TaskList from './task-list';

const TaskListCon = () => {
    const dispatch = useDispatch();
    // states and variables
    const taskLists = useSelector((state: any) => state.taskLists);
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const cachedLists = useMemo(() => taskLists.data, [taskLists.data]);

    useEffect(() => {
        if (userEmail) {
            dispatch(getListsByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    if (taskLists.loading) return <Icon iconName='' />;
    return (
        <div>
            {!taskLists.error ? (
                cachedLists?.map((taskList: any) => (
                    <TaskList
                        key={taskList._id}
                        id={taskList._id}
                        userEmail={userEmail}
                        href='/hey'
                        label={taskList.list_title}
                        listColor={taskList.list_color}
                    />
                )) ?? null
            ) : (
                <p>{'Not found :('}</p>
            )}
        </div>
    );
};

export default TaskListCon;

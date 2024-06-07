'use client';

// public
import { useAppSelector } from '@/redux/app/hook';

//* components
import TaskList from './task-list';
import ListLoadingSkeleton from './list-loading-skeleton';

//* functions
import { convertTitleToPathname } from '@/helper/functions/functions';

const TaskListCon = () => {
    // states and variables
    const lists = useAppSelector((state) => state.taskLists);

    if ((lists.beforeLoading || lists.loading) && !lists.data.length)
        return <ListLoadingSkeleton />;

    return (
        <div>
            {!lists.error ? (
                lists?.data?.length ? (
                    lists?.data?.map((taskList: any) => (
                        <TaskList
                            key={taskList._id}
                            id={taskList._id}
                            userEmail={taskList.email}
                            href={`/list/${convertTitleToPathname(
                                taskList?.list_title ?? ''
                            )}`}
                            label={taskList.list_title}
                            listColor={taskList.list_color}
                        />
                    ))
                ) : null
            ) : (
                <p>{'Not found :('}</p>
            )}
        </div>
    );
};

export default TaskListCon;

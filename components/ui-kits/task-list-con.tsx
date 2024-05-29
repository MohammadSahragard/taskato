'use client';

//* components
import TaskList from './task-list';
import ListLoadingSkeleton from './list-loading-skeleton';

//* hooks
import useUserLists from '@/hooks/use-user-lists';

const TaskListCon = () => {
    // states and variables
    const taskLists: any = useUserLists();

    if (
        (taskLists.beforeLoading || taskLists.loading) &&
        !taskLists.data.length
    )
        return <ListLoadingSkeleton />;

    return (
        <div>
            {!taskLists.error ? (
                taskLists?.data?.length ? (
                    taskLists?.data?.map((taskList: any) => (
                        <TaskList
                            key={taskList._id}
                            id={taskList._id}
                            userEmail={taskList.email}
                            href='/hey'
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

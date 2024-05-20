'use client';

//* components
import Icon from '../ui/texts/icon';
import TaskList from './task-list';

//* hooks
import useUserLists from '@/hooks/use-user-lists';

const TaskListCon = () => {
    // states and variables
    const taskLists: any = useUserLists();

    if (taskLists.loading)
        return (
            <p className='text-center'>
                <Icon
                    iconName='spinner-third fa-spin'
                    style='fad'
                />
            </p>
        );

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

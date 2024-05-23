'use client';

//* components
import Icon from '../ui/texts/icon';
import TaskItem from './task-item';
import TaskList from './task-list';

//* hooks
import useUserTasks from '@/hooks/use-user-tasks';

const TasksCon = () => {
    // states and variables
    const tasks: any = useUserTasks();

    if (tasks.loading)
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
            {!tasks.error ? (
                tasks?.data?.length ? (
                    tasks?.data?.map((task: any) => (
                        <TaskItem
                            key={task._id}
                            taskData={task}
                        />
                    ))
                ) : <p>{'Not found :('}</p>
            ) : (
                <p>{tasks.error}</p>
            )}
        </div>
    );
};

export default TasksCon;

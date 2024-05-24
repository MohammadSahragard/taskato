'use client';

import Divider from '../ui/texts/divider';
//* components
import Icon from '../ui/texts/icon';
import Subtitle from '../ui/texts/subtitle';
import TaskItem from './task-item';

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
                    tasks?.data?.map((task: any) =>
                        task?.task_complete ? (
                            <div key={task._id}>
                                <TaskItem taskData={task} />
                            </div>
                        ) : (
                            <div key={task._id}>
                                <Subtitle
                                    subtitle='COMPLETED'
                                    additionalClasses='text-xs my-2'
                                />
                                <Divider />
                                <TaskItem taskData={task} />
                            </div>
                        )
                    )
                ) : (
                    <p>{'Not found :('}</p>
                )
            ) : (
                <p>{tasks.error}</p>
            )}
        </div>
    );
};

export default TasksCon;

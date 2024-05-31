'use client';

// public
import { useSelector } from 'react-redux';

//* components
import Subtitle from '../ui/texts/subtitle';
import EmptyStateTasks from './empty-state-tasks';
import TaskItem from './task-item';
import Divider from '../ui/texts/divider';
import TaskLoadingSkeleton from './task-loading-skeleton';

//* functions
import { getTasksByPathname } from '@/helper/functions/task-functions';

const TasksCon = ({ pathname }: { pathname: string }) => {
    // states and variables
    const tasks = useSelector((state: any) => state.tasks);
    const matchTasks = getTasksByPathname(tasks?.data ?? [], pathname);
    const taskDone = matchTasks?.find((task: any) => task.task_completion);

    // conditional rendering
    if (tasks.loading && !tasks.data.length) return <TaskLoadingSkeleton />;
    if (tasks.beforeLoading) return <TaskLoadingSkeleton />;
    return (
        <div>
            {!tasks.error ? (
                matchTasks?.length ? (
                    <>
                        <div>
                            {matchTasks?.map(
                                (task: any) =>
                                    !task?.task_completion && (
                                        <TaskItem
                                            key={task._id}
                                            taskData={task}
                                        />
                                    )
                            )}
                        </div>
                        <div className='mt-4'>
                            {taskDone ? (
                                <section className='mb-2'>
                                    <Subtitle
                                        subtitle='COMPLETED'
                                        additionalClasses='text-xs my-2'
                                    />
                                    <Divider />
                                </section>
                            ) : null}

                            {matchTasks?.map(
                                (task: any) =>
                                    task?.task_completion && (
                                        <TaskItem
                                            key={task._id}
                                            taskData={task}
                                        />
                                    )
                            )}
                        </div>
                    </>
                ) : (
                    <EmptyStateTasks />
                )
            ) : (
                <p>{tasks.error}</p>
            )}
        </div>
    );
};

export default TasksCon;

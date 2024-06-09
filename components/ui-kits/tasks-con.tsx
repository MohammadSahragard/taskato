'use client';

// Public
import { useAppSelector } from '@/redux/app/hook';

//* Components
import Subtitle from '../ui/texts/subtitle';
import EmptyStateTasks from './empty-state-tasks';
import TaskItem from './task-item';
import Divider from '../ui/texts/divider';
import TaskLoadingSkeleton from './task-loading-skeleton';

//* Functions
import { getTasksByPathname } from '@/helper/functions/task-functions';

const TasksCon = ({ pathname }: { pathname: string }) => {
    // States and variables
    const tasks = useAppSelector((state) => state.tasks);
    const matchTasks = getTasksByPathname(tasks?.data ?? [], pathname);
    const taskDone = matchTasks?.find((task: any) => task.task_completion);

    // Conditional rendering
    if ((tasks.loading || tasks.beforeLoading) && !tasks.data.length)
        return <TaskLoadingSkeleton />;
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

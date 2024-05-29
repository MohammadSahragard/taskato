'use client';

//* components
import Subtitle from '../ui/texts/subtitle';
import EmptyStateTasks from './empty-state-tasks';
import TaskItem from './task-item';
import Divider from '../ui/texts/divider';
import TaskLoadingSkeleton from './task-loading-skeleton';

//* hooks
import useUserTasks from '@/hooks/use-user-tasks';

const TasksCon = () => {
    // states and variables
    const tasks: any = useUserTasks();
    const taskDone = tasks?.data?.find((task: any) => task.task_completion);

    if (tasks.loading && !tasks.data.length) return <TaskLoadingSkeleton />;
    if (tasks.beforeLoading) return <TaskLoadingSkeleton />;

    return (
        <div>
            {!tasks.error ? (
                tasks?.data?.length ? (
                    <>
                        <div>
                            {tasks?.data?.map(
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

                            {tasks?.data?.map(
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

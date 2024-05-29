'use client';

// public
import { useSelector, useDispatch } from 'react-redux';

//* components
import Divider from '../ui/texts/divider';
import AddToFavoriteBtn from '../ui/buttons/add-to-favorite-btn';
import CheckTaskBtn from '../ui/buttons/check-task-btn';
import Icon from '../ui/texts/icon';
import Subtitle from '../ui/texts/subtitle';
import Title from '../ui/texts/title';

//* functions
import {
    getLocalDateString,
    toggleTaskDetailsSidebar,
} from '@/helper/functions/functions';

const TaskItem = ({ taskData }: { taskData: any }) => {
    const dispatch = useDispatch();
    // state and variables
    const completedStyles = 'line-through text-primary-200';
    const completedTask = taskData?.task_completion ? completedStyles : '';
    const haveSubDetails =
        taskData?.task_due_date ||
        taskData?.subtasks?.length ||
        taskData?.task_list?.list_title;

    return (
        <div
            className='task-item'
            onClick={() => toggleTaskDetailsSidebar(dispatch, taskData)}
        >
            <section>
                <CheckTaskBtn
                    isCompleted={taskData?.task_completion}
                    taskId={taskData?._id}
                />
            </section>

            <div className='task-content'>
                <div className='flex items-center px-2'>
                    <Title
                        title={taskData?.task_title}
                        additionalClasses={completedTask}
                    />
                </div>
                {/* sub detail section */}
                {haveSubDetails ? (
                    <div className='task-sub-detail'>
                        {taskData?.task_due_date ? (
                            <>
                                <Subtitle additionalClasses='text-xs'>
                                    <Icon
                                        iconName='calendar-days'
                                        size='sm'
                                    />{' '}
                                    <span>
                                        {getLocalDateString(
                                            new Date(taskData?.task_due_date)
                                        )}
                                    </span>
                                </Subtitle>
                            </>
                        ) : null}

                        {taskData?.subtasks?.length ? (
                            <>
                                <Divider orientation='vertical' />
                                <Subtitle additionalClasses='text-xs flex gap-px'>
                                    <div className='subtask-counter'>
                                        {taskData?.subtasks?.length > 9
                                            ? '+9'
                                            : taskData?.subtasks?.length}
                                    </div>
                                    <span>Subtasks</span>
                                </Subtitle>
                            </>
                        ) : null}
                        {taskData?.task_list?.list_title ? (
                            <>
                                <Divider orientation='vertical' />
                                <Subtitle additionalClasses='text-xs'>
                                    <Icon
                                        iconName='square'
                                        size='sm'
                                        style='fas'
                                        forceColor={
                                            taskData?.task_list?.list_color
                                        }
                                    />{' '}
                                    <span>
                                        {taskData?.task_list?.list_title}
                                    </span>
                                </Subtitle>
                            </>
                        ) : null}
                    </div>
                ) : null}
            </div>

            <section>
                <AddToFavoriteBtn isInFavorite={taskData?.is_in_favorite} />
            </section>
        </div>
    );
};

export default TaskItem;

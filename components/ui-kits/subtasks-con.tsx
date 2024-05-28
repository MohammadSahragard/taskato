'use client';

// public
import { useSelector } from 'react-redux';
import TodoDetailsSubtask from '../ui/buttons/todo-details-subtask';

const SubtasksCon = () => {
    // states and variables
    const subtasks = useSelector((state: any) => state.selectedTask.subtasks);

    return (
        <div className='relative'>
            <div className='absolute inset-0 overflow-auto'>
                {
                    subtasks.length
                        ? subtasks.map((subtask: any) => (
                            <TodoDetailsSubtask
                                key={subtask._id}
                                _id={subtask._id}
                                title={subtask.subtask_title}
                                isCompleted={subtask.subtask_completion}
                            />
                        ))
                    : null
                }
            </div>
        </div>
    );
};

export default SubtasksCon;

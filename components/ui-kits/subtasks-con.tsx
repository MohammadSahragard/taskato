'use client';

// public
import { useSelector } from 'react-redux';

//* components
import { ScrollShadow } from '@nextui-org/react';
import TaskDetailsSubtask from '../ui/buttons/subtask-item';

const SubtasksCon = () => {
    // states and variables
    const subtasks = useSelector((state: any) => state.selectedTask.subtasks);

    return (
        <div className='relative'>
            <ScrollShadow className='absolute inset-0 inset-y-1 overflow-auto'>
                {subtasks.length
                    ? subtasks.map((subtask: any) => (
                          <TaskDetailsSubtask
                              key={subtask._id}
                              _id={subtask._id}
                              title={subtask.subtask_title}
                              isCompleted={subtask.subtask_completion}
                          />
                      ))
                    : null}
            </ScrollShadow>
        </div>
    );
};

export default SubtasksCon;

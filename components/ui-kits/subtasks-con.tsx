'use client';

// Public
import { useAppSelector } from '@/redux/app/hook';

//* Components
import { ScrollShadow } from '@nextui-org/react';
import SubtaskItem from '../ui/buttons/subtask-item';

const SubtasksCon = () => {
    // States and variables
    const subtasks = useAppSelector((state) => state.selectedTask.subtasks);

    return (
        <div className='relative min-h-28'>
            <ScrollShadow className='absolute inset-0 inset-y-1 overflow-auto'>
                {subtasks?.length
                    ? subtasks?.map((subtask: any) => (
                        <SubtaskItem
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

'use client';

// public
import { useSelector } from 'react-redux';
import TodoDetailsSubtask from '../ui/texts/todo-details-subtask';

const SubtasksCon = () => {
    // states and variables
    const subtasks = useSelector((state: any) => state.selectedTask.subtasks);

    return (
        <div className='overflow-auto'>
            {subtasks.length
                ? subtasks.map((subtask: any) => (
                      <TodoDetailsSubtask
                          key={subtask._id}
                          _id={subtask._id}
                          title={subtask.subtask_title}
                          isCompleted={subtask.subtask_completion}
                      />
                  ))
                : null}
        </div>
    );
};

export default SubtasksCon;

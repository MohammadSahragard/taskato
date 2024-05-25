'use client';

// public
import { useSelector } from 'react-redux';

//* components
import AddSubtaskBtn from '@/components/ui/buttons/add-subtask-btn';
import CloseTodoDetail from '@/components/ui/buttons/close-todo-detail';
import TodoDetailsDateBtn from '@/components/ui/buttons/todo-details-date-btn';
import TodoDetailsDeleteBtn from '@/components/ui/buttons/todo-details-delete-btn';
import TodoDetailsListBtn from '@/components/ui/buttons/todo-details-list-btn';
import TodoDetailsReminderBtn from '@/components/ui/buttons/todo-details-reminder-btn';
import TodoDetailsSaveBtn from '@/components/ui/buttons/todo-details-save-btn';
import Heading from '@/components/ui/texts/heading';
import TodoDetailsSubtask from '@/components/ui/texts/todo-details-subtask';
import TodoDetailsTaskDescription from '@/components/ui/texts/todo-details-task-description';
import TodoDetailsTaskTitle from '@/components/ui/texts/todo-details-task-title';

const TodoDetails = () => {
    // states and variables
    const taskData = useSelector((state: any) => state.selectedTask);

    return (
        <div className='todo-details-bar'>
            {/* todo details header */}
            <header className='todo-details-header'>
                <Heading
                    heading='Task'
                    additionalClasses='text-primary-200 font-medium'
                />
                <CloseTodoDetail />
            </header>

            {/* todo details main content */}
            <div className='todo-details-main'>
                {/* task content section */}
                <section className='space-y-2'>
                    <TodoDetailsTaskTitle />
                    <TodoDetailsTaskDescription />
                    <TodoDetailsDateBtn />
                    <TodoDetailsListBtn />
                    <TodoDetailsReminderBtn />
                </section>

                {/* subtasks section */}
                <div className='subtasks-con'>
                    <Heading
                        heading='Subtasks'
                        additionalClasses='text-primary-200 font-medium'
                    />
                    <AddSubtaskBtn />
                    <section className='overflow-auto'>
                        <TodoDetailsSubtask />
                    </section>
                </div>

                {/* CTA section */}
                <section className='todo-details-CTA'>
                    <TodoDetailsDeleteBtn />
                    <TodoDetailsSaveBtn />
                </section>
            </div>
        </div>
    );
};

export default TodoDetails;

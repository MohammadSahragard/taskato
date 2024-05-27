'use client';

// public
import { useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Input } from '@nextui-org/react';
import AddDateBtn from '../ui/buttons/add-date-btn';
import AddToListBtn from '../ui/buttons/add-to-list-btn';
import AddReminderBtn from '../ui/buttons/add-reminder-btn';
import AddTodoBtn from '../ui/buttons/add-todo-btn';

//* redux
import { setTaskTitle, setClearFields } from '@/redux/features/todoSlice';
import { addTask } from '@/helper/functions/todo-functions';
import { getTasksByEmail } from '@/redux/features/tasksSlice';

//* toastify
import { toast } from 'react-toastify';

const AddTodoBar = () => {
    // states and variables
    const dispatch = useDispatch();
    const [isPending, startTransition] = useTransition();
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const taskTitle = useSelector((state: any) => state.taskData.taskTitle);
    const taskData = useSelector((state: any) => state.taskData);

    // submit task
    const submitTask = async (event: any) => {
        event.preventDefault();

        const task = await addTask(taskData, userEmail);
        const messageStatus = task.status === 200 ? 'success' : 'error';
        toast[messageStatus](task.message);
        if (task.status === 200) {
            dispatch(setClearFields());
            dispatch(getTasksByEmail(userEmail));
        }
    };

    return (
        <form
            onSubmit={(event: any) => startTransition(() => submitTask(event))}
        >
            <Input
                size='lg'
                variant='bordered'
                placeholder='Type here'
                value={taskTitle}
                autoComplete='off'
                isDisabled={isPending}
                onChange={(event) => dispatch(setTaskTitle(event.target.value))}
                startContent={
                    <AddTodoBtn
                        submitTask={submitTask}
                        startTransition={startTransition}
                        isPending={isPending}
                    />
                }
                classNames={{
                    inputWrapper: 'todo-bar',
                }}
                endContent={
                    <div className='todo-options'>
                        <AddDateBtn />
                        <AddToListBtn />
                        <AddReminderBtn />
                    </div>
                }
            />
        </form>
    );
};

export default AddTodoBar;

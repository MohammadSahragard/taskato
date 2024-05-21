'use client';

// public
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Input } from '@nextui-org/react';
import AddDateBtn from '../ui/buttons/add-date-btn';
import AddToListBtn from '../ui/buttons/add-to-list-btn';
import AddReminderBtn from '../ui/buttons/add-reminder-btn';
import AddTodoBtn from '../ui/buttons/add-todo-btn';

//* redux
import { setTaskTitle } from '@/redux/features/todoSlice';
import { addTask } from '@/helper/functions/todo-functions';

//* toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodoBar = () => {
    // states and variables
    const dispatch = useDispatch();
    const taskTitle = useSelector((state: any) => state.taskData.taskTitle);
    const taskData = useSelector((state: any) => state.taskData);

    // submit task
    const submitTask = async (event: any) => {
        event.preventDefault();

        const task = await addTask(taskData);
        toast.success('Wow so easy !');
    };

    return (
        <form onSubmit={(event: any) => submitTask(event)}>
            <Input
                size='lg'
                variant='bordered'
                placeholder='Type here'
                value={taskTitle}
                onChange={(event) => dispatch(setTaskTitle(event.target.value))}
                startContent={<AddTodoBtn submitTask={submitTask} />}
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
            <ToastContainer theme='colored' />
        </form>
    );
};

export default AddTodoBar;

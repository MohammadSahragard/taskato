'use client';

// public
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Input } from '@nextui-org/react';
import AddDateBtn from '../ui/buttons/add-date-btn';
import AddToListBtn from '../ui/buttons/add-to-list-btn';
import AddReminderBtn from '../ui/buttons/add-reminder-btn';
import AddTaskBtn from '../ui/buttons/add-task-btn';
import MobileMoreTaskOPtions from '../ui/buttons/mobile-more-task-options';

//* redux
import { setTaskTitle, setClearFields } from '@/redux/features/todoSlice';
import { addTask } from '@/helper/functions/task-functions';
import { getTasksByEmail } from '@/redux/features/tasksSlice';

//* toastify
import { toast } from 'react-toastify';

const AddTaskBar = () => {
    const fullPathname = usePathname();
    // states and variables
    const dispatch = useDispatch();
    const [isPending, startTransition] = useTransition();
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const taskTitle = useSelector((state: any) => state.taskData.taskTitle);
    const taskData = useSelector((state: any) => state.taskData);
    const lists = useSelector((state: any) => state.taskLists.data);

    // submit task
    const submitTask = async (event: any) => {
        event.preventDefault();

        const task = await addTask(taskData, userEmail, fullPathname, lists);
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
                    <AddTaskBtn
                        submitTask={submitTask}
                        startTransition={startTransition}
                        isPending={isPending}
                    />
                }
                classNames={{
                    inputWrapper: 'task-bar',
                }}
                endContent={
                    <div>
                        <MobileMoreTaskOPtions />
                        <section className='hidden md:flex'>
                            <AddDateBtn />
                            <AddToListBtn />
                            <AddReminderBtn />
                        </section>
                    </div>
                }
            />
        </form>
    );
};

export default AddTaskBar;

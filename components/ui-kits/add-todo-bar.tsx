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
import { setTodoText } from '@/redux/features/todoSlice';

const AddTodoBar = () => {
    // states and variables
    const dispatch = useDispatch();
    const todoText = useSelector((state: any) => state.todoContent.todoText);

    return (
        <Input
            size='lg'
            variant='bordered'
            placeholder='Type here'
            value={todoText}
            onChange={(event) => dispatch(setTodoText(event.target.value))}
            startContent={<AddTodoBtn />}
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
    );
};

export default AddTodoBar;

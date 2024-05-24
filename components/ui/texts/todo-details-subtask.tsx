//* components
import { Button } from '@nextui-org/react';
import CheckTodoSubtaskBtn from '../buttons/check-todo-subtask-btn';

const TodoDetailsSubtask = () => {
    return (
        <Button
            className='todo-details-subtask'
            fullWidth
            radius='sm'
            startContent={<CheckTodoSubtaskBtn />}
        >
            Subtask one
        </Button>
    );
};

export default TodoDetailsSubtask;

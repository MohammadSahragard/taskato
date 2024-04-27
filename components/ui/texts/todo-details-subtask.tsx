//* components
import { Input } from '@nextui-org/react';
import CheckTodoSubtaskBtn from '../buttons/check-todo-subtask-btn';

const TodoDetailsSubtask = () => {
    return (
        <Input
            classNames={{
                inputWrapper: 'todo-details-subtask',
            }}
            value='Subtask one'
            size='sm'
            isReadOnly
            startContent={<CheckTodoSubtaskBtn />}
        />
    );
};

export default TodoDetailsSubtask;

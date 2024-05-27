//* components
import { Button } from '@nextui-org/react';
import CheckTodoSubtaskBtn from '../buttons/check-todo-subtask-btn';

const TodoDetailsSubtask = ({
    _id,
    title,
    isCompleted,
}: {
    _id: string;
    title: string;
    isCompleted: boolean;
}) => {
    console.log('_id: ', _id);
    return (
        <Button
            className='todo-details-subtask'
            fullWidth
            radius='sm'
            startContent={<CheckTodoSubtaskBtn isCompleted={isCompleted} />}
        >
            {title}
        </Button>
    );
};

export default TodoDetailsSubtask;

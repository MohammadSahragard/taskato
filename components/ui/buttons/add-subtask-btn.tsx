import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const AddSubtaskBtn = () => {
    return (
        <Button
            className='todo-details-btn'
            variant='bordered'
            fullWidth
            radius='sm'
            startContent={<Icon iconName='plus' />}
        >
            Add new subtask
        </Button>
    );
};

export default AddSubtaskBtn;

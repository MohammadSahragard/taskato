'use client';

// public

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const AddTodoBtn = () => {
    return (
        <Button
            variant='light'
            startContent={<Icon iconName='plus' />}
            isIconOnly
        />
    );
};

export default AddTodoBtn;

'use client';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

//* functions
import { toggleTodoDetailPanel } from '@/helper/functions/functions';

const CloseTodoDetail = () => {
    return (
        <Button
            isIconOnly
            size='sm'
            radius='sm'
            variant='light'
            startContent={<Icon iconName='close' />}
            onClick={toggleTodoDetailPanel}
        />
    );
};

export default CloseTodoDetail;

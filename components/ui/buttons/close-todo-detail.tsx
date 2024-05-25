'use client';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

//* functions
import { toggleTodoDetailPanelBtn } from '@/helper/functions/functions';

const CloseTodoDetail = () => {
    return (
        <Button
            isIconOnly
            size='sm'
            radius='sm'
            variant='light'
            startContent={<Icon iconName='close' />}
            onClick={toggleTodoDetailPanelBtn}
        />
    );
};

export default CloseTodoDetail;

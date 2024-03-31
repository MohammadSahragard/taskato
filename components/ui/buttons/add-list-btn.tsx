'use client';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const AddListBtn = () => {
    return (
        <Button
            radius='sm'
            variant='light'
            className='fw-btn'
            startContent={
                <Icon
                    iconName='plus'
                    style='fas'
                />
            }
        >
            Add New List
        </Button>
    );
};

export default AddListBtn;

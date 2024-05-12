//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const MenuToggleBtn = () => {
    return (
        <Button
            size='sm'
            isIconOnly
            radius='sm'
            variant='light'
        >
            <Icon iconName='bars' />
        </Button>
    );
};

export default MenuToggleBtn;

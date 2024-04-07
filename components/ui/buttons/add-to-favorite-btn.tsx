//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const AddToFavoriteBtn = () => {
    return (
        <Button
            startContent={<Icon iconName='star' />}
            isIconOnly
            variant='light'
        />
    );
};

export default AddToFavoriteBtn;

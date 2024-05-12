//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const AddToFavoriteBtn = ({
    isInFavorite,
}: {
    isInFavorite: boolean | undefined;
}) => {
    const iconStyle = isInFavorite ? 'fas' : 'far';

    return (
        <Button
            startContent={
                <Icon
                    iconName='star'
                    style={iconStyle}
                />
            }
            isIconOnly
            radius='sm'
            variant='light'
        />
    );
};

export default AddToFavoriteBtn;

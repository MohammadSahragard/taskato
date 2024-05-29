//* components
import { Button, Tooltip } from '@nextui-org/react';
import Icon from '../texts/icon';
import TooltipElement from '../texts/tooltip-element';

const AddToFavoriteBtn = ({
    isInFavorite,
}: {
    isInFavorite: boolean | undefined;
}) => {
    const iconStyle = isInFavorite ? 'fas' : 'far';

    return (
        <TooltipElement title='Add to important'>
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
        </TooltipElement>
    );
};

export default AddToFavoriteBtn;

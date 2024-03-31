//* components
import { Chip } from '@nextui-org/react';

const ItemsCounter = ({ value }: { value: number }) => {
    return (
        <Chip
            size='sm'
            radius='sm'
            className='items-counter'
        >
            {value}
        </Chip>
    );
};

export default ItemsCounter;

//* Components
import { Chip } from '@nextui-org/react';

const ItemsCounter = ({ value }: { value: number }) => {
    return (
        <Chip
            size='sm'
            className='rounded'
        >
            {value}
        </Chip>
    );
};

export default ItemsCounter;

//* components
import { Divider as NextUiDivider } from '@nextui-org/react';

const Divider = ({
    orientation,
}: {
    orientation?: 'vertical' | 'horizontal';
}) => {
    // default orientation is horizontal
    return (
        <NextUiDivider
            orientation={orientation}
            className='opacity-40'
        />
    );
};

export default Divider;

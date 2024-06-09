//* Components
import { Divider as NextUiDivider } from '@nextui-org/react';

//* types
type DividerTypes = {
    orientation?: 'vertical' | 'horizontal';
};

const Divider = ({ orientation }: DividerTypes) => {
    // Default orientation is horizontal
    return (
        <NextUiDivider
            orientation={orientation}
            className='opacity-40'
        />
    );
};

export default Divider;

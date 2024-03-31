//* components
import { Divider as NextUiDivider } from '@nextui-org/react';

const Divider = ({
    orientation,
}: {
    orientation?: 'vertical' | 'horizontal';
}) => {
    // default orientation is horizontal
    return <NextUiDivider orientation={orientation} />;
};

export default Divider;

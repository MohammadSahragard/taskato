// public
import { ReactNode } from 'react';

//* components
import { Tooltip } from '@nextui-org/react';

const TooltipElement = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => {
    return (
        <Tooltip
            content={title}
            delay={500}
        >
            {children}
        </Tooltip>
    );
};

export default TooltipElement;

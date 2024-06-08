//* components
import { Tooltip } from '@nextui-org/react';

const TooltipElement = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <Tooltip
            content={title}
            delay={800}
        >
            {children}
        </Tooltip>
    );
};

export default TooltipElement;

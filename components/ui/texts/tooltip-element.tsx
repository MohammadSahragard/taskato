//* Components
import { Tooltip } from '@nextui-org/react';

//* Types
type TooltipElementType = {
    title: string;
    children: React.ReactNode;
};

const TooltipElement = ({ title, children }: TooltipElementType) => {
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

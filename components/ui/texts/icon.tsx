//* types
import { IconTypes } from '@/types/types';

const Icon = ({ iconName, style, color, size }: IconTypes) => {
    return (
        <i
            className={`
                    ${style ? style : 'far'}
                    fa-${iconName}
                    ${color ? color : 'text-primary-200'}
                    ${size ? `text-${size}` : 'text-xl'}
            `}
        ></i>
    );
};

export default Icon;

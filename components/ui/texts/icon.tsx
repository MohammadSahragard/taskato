//* types
import { IconTypes } from '@/types/types';

const Icon = ({ iconName, style, color, size, forceColor }: IconTypes) => {
    return (
        <i
            className={`
                    ${style ? style : 'far'}
                    fa-${iconName}
                    ${color ? color : 'text-primary-200'}
                    ${size ? `text-${size}` : 'text-xl'}
            `}
            style={{ color: forceColor }}
        ></i>
    );
};

export default Icon;

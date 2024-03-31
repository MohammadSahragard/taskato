//* types
import { Icon } from '@/types/types';

const Icon = ({ iconName, style, color }: Icon) => {
    return (
        <i
            className={`
                    ${style ? style : 'far'}
                    fa-${iconName}
                    ${color ? color : 'text-primary-200'}
                    text-xl
            `}
        ></i>
    );
};

export default Icon;

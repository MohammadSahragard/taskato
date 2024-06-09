//* Types
import { TitleTypes } from '@/types/types';

const Title = ({ title, additionalClasses }: TitleTypes) => {
    return <h3 className={`title ${additionalClasses}`}>{title}</h3>;
};

export default Title;

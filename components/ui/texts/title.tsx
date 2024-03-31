//* types
import { Title } from '@/types/types';

const Title = ({ title, additionalClasses }: Title) => {
    return <h3 className={`title ${additionalClasses}`}>{title}</h3>;
};

export default Title;

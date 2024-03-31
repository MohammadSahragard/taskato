//* types
import { Subtitle } from '@/types/types';

const Subtitle = ({ subtitle, additionalClasses }: Subtitle) => {
    return <h3 className={`subtitle ${additionalClasses}`}>{subtitle}</h3>;
};

export default Subtitle;
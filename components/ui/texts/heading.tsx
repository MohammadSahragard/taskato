//* types
import { Heading } from '@/types/types';

const Heading = ({ heading, additionalClasses }: Heading) => {
    return <h3 className={`heading ${additionalClasses}`}>{heading}</h3>;
};

export default Heading;
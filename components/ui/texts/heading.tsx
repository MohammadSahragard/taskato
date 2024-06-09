//* Types
import { HeadingTypes } from '@/types/types';

const Heading = ({ heading, additionalClasses }: HeadingTypes) => {
    return <h3 className={`heading ${additionalClasses}`}>{heading}</h3>;
};

export default Heading;

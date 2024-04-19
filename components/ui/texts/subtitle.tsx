//* types
import { SubtitleTypes } from '@/types/types';

const Subtitle = ({ subtitle, additionalClasses, children }: SubtitleTypes) => {
    return (
        <h3 className={`subtitle ${additionalClasses}`}>
            {subtitle ?? children}
        </h3>
    );
};

export default Subtitle;

import Image from 'next/image';
import Subtitle from '../ui/texts/subtitle';
import Heading from '../ui/texts/heading';

const EmptyStateTasks = () => {
    return (
        <div className='empty-state'>
            <Image
                src='/empty-state-tasks.svg'
                width='200'
                height='200'
                alt='Empty state tasks'
            />

            <Heading heading='You have no tasks to do!' additionalClasses='mt-3' />

            <Subtitle subtitle='To create a task, use the field at the bottom of the page.' />
        </div>
    );
};

export default EmptyStateTasks;

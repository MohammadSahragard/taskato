import Image from 'next/image';
import Subtitle from '../ui/texts/subtitle';
import Heading from '../ui/texts/heading';

const EmptyStateTasks = () => {
    return (
        <div className='empty-state-tasks'>
            <Image
                src='/images/empty-state-tasks.svg'
                width='150'
                height='150'
                alt='Empty state tasks'
            />

            <Heading heading='You have no tasks to do!' additionalClasses='mt-3' />

            <Subtitle subtitle='To create a task, use the field at the bottom of the page.' />
        </div>
    );
};

export default EmptyStateTasks;

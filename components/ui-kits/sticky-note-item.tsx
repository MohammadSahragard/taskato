//* components
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Subtitle from '../ui/texts/subtitle';
import Title from '../ui/texts/title';

const StickyNoteItem = () => {
    return (
        <Card
            className='sticky-note'
            radius='sm'
        >
            <CardHeader>
                <Title title='This is a title' />
            </CardHeader>
            <CardBody>
                <Subtitle
                    subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Aliquam molestiae voluptate placeat eligendi.'
                />
            </CardBody>
        </Card>
    );
};

export default StickyNoteItem;

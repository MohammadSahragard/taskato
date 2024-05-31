//* components
import TasksCon from '@/components/ui-kits/tasks-con';

const List = ({ params }: { params: { list_name: string } }) => {
    return (
        <div>
            <TasksCon pathname={params.list_name} />
        </div>
    );
};

export default List;

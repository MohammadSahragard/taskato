//* components
import MobileTaskDetails from './mobile-task-details';
import TaskDetailsComponents from './task-details-components';

const TaskDetails = () => {
    return (
        <>
            <div className='task-details'>
                <TaskDetailsComponents />
            </div>

            <MobileTaskDetails />
        </>
    );
};

export default TaskDetails;

//* components
import SubtasksCon from '@/components/ui-kits/subtasks-con';
import AddSubtaskBtn from '@/components/ui/buttons/add-subtask-btn';
import CloseTaskDetails from '@/components/ui/buttons/close-task-details';
import TaskDetailsDateBtn from '@/components/ui/buttons/task-details-date-btn';
import TaskDetailsDeleteBtn from '@/components/ui/buttons/task-details-delete-btn';
import TaskDetailsListBtn from '@/components/ui/buttons/task-details-list-btn';
import TaskDetailsReminderBtn from '@/components/ui/buttons/task-details-reminder-btn';
import TaskDetailsSaveBtn from '@/components/ui/buttons/task-details-save-btn';
import Heading from '@/components/ui/texts/heading';
import TaskDetailsDescription from '@/components/ui/texts/task-details-description';
import TaskDetailsTaskTitle from '@/components/ui/texts/task-details-title';

const TaskDetails = () => {
    return (
        <div className='task-details-bar'>
            {/* task details header */}
            <header className='task-details-header'>
                <Heading
                    heading='Task'
                    additionalClasses='text-primary-200 font-medium'
                />
                <CloseTaskDetails />
            </header>

            {/* task details main content */}
            <div className='task-details-main'>
                {/* task content section */}
                <section className='space-y-2'>
                    <TaskDetailsTaskTitle />
                    <TaskDetailsDescription />
                    <TaskDetailsDateBtn />
                    <TaskDetailsListBtn />
                    <TaskDetailsReminderBtn />
                </section>

                {/* subtasks section */}
                <div className='subtasks-con'>
                    <Heading
                        heading='Subtasks'
                        additionalClasses='text-primary-200 font-medium'
                    />
                    <AddSubtaskBtn />
                    <SubtasksCon />
                </div>

                {/* CTA section */}
                <section className='task-details-CTA'>
                    <TaskDetailsDeleteBtn />
                    <TaskDetailsSaveBtn />
                </section>
            </div>
        </div>
    );
};

export default TaskDetails;

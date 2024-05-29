import { Card, Skeleton } from '@nextui-org/react';

const TaskLoadingSkeleton = () => {
    return (
        <div className='task-loading-skeleton'>
            <Card className='skeleton-card'>
                <Skeleton className='w-10 h-10 rounded-lg' />

                <div className='task-content'>
                    <div className='flex items-center'>
                        <Skeleton className='w-2/5 h-4 rounded' />
                    </div>

                    <div className='flex pt-2 gap-2'>
                        <Skeleton className='w-20 h-3 rounded' />
                        <Skeleton className='w-20 h-3 rounded' />
                    </div>
                </div>

                <Skeleton className='w-10 h-10 rounded-lg' />
            </Card>

            <Card className='skeleton-card'>
                <Skeleton className='w-10 h-10 rounded-lg' />

                <div className='flex items-center py-1'>
                    <Skeleton className='w-2/5 h-4 rounded' />
                </div>

                <Skeleton className='w-10 h-10 rounded-lg' />
            </Card>

            <Card className='skeleton-card'>
                <Skeleton className='w-10 h-10 rounded-lg' />

                <div className='task-content'>
                    <div className='flex items-center'>
                        <Skeleton className='w-2/5 h-4 rounded' />
                    </div>

                    <div className='flex pt-2 gap-2'>
                        <Skeleton className='w-20 h-3 rounded' />
                        <Skeleton className='w-20 h-3 rounded' />
                        <Skeleton className='w-20 h-3 rounded' />
                    </div>
                </div>

                <Skeleton className='w-10 h-10 rounded-lg' />
            </Card>
        </div>
    );
};

export default TaskLoadingSkeleton;

//* components
import { Card, Skeleton } from '@nextui-org/react';

const ListLoadingSkeleton = () => {
    return (
        <div className='space-y-2 pb-2'>
            <Card className='skeleton-card rounded-lg p-[6px]'>
                <Skeleton className='w-7 h-7 rounded' />

                <div className='h-full w-full flex items-center'>
                    <Skeleton className='w-2/4 h-3 rounded' />
                </div>
                
                <Skeleton className='w-7 h-7 rounded' />
            </Card>

            <Card className='skeleton-card rounded-lg p-[6px]'>
                <Skeleton className='w-7 h-7 rounded' />

                <div className='h-full flex items-center'>
                    <Skeleton className='w-3/4 h-3 rounded' />
                </div>
                
                <Skeleton className='w-7 h-7 rounded' />
            </Card>

            <Card className='skeleton-card rounded-lg p-[6px]'>
                <Skeleton className='w-7 h-7 rounded' />

                <div className='h-full flex items-center'>
                    <Skeleton className='w-2/4 h-3 rounded' />
                </div>
                
                <Skeleton className='w-7 h-7 rounded' />
            </Card>
        </div>
    );
};

export default ListLoadingSkeleton;

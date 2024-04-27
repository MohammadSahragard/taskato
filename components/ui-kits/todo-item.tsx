'use client';

//* components
import Divider from '../ui/texts/divider';
import AddToFavoriteBtn from '../ui/buttons/add-to-favorite-btn';
import CheckTodoBtn from '../ui/buttons/check-todo-btn';
import Icon from '../ui/texts/icon';
import Subtitle from '../ui/texts/subtitle';
import Title from '../ui/texts/title';

//* types
import { TodoItemTypes } from '@/types/types';

//* functions
import { toggleTodoDetailPanel } from '@/helper/functions/functions';

const TodoItem = ({
    todoText,
    isCompleted,
    isInFavorite,
    todoSubDetail,
}: TodoItemTypes) => {
    const completedStyles = 'line-through text-primary-200';
    const completedTodo = isCompleted ? completedStyles : '';

    return (
        <div
            className='todo-item'
            onClick={toggleTodoDetailPanel}
        >
            <section>
                <CheckTodoBtn isCompleted={isCompleted} />
            </section>

            <div className='todo-content'>
                <div className='flex items-center px-2'>
                    <Title
                        title={todoText}
                        additionalClasses={completedTodo}
                    />
                </div>
                {/* sub detail section */}
                {todoSubDetail ? (
                    <div className='todo-sub-detail'>
                        <Subtitle additionalClasses='text-xs'>
                            <Icon
                                iconName='calendar-days'
                                size='sm'
                            />{' '}
                            <span>4-2-2024</span>
                        </Subtitle>
                        <Divider orientation='vertical' />
                        <Subtitle additionalClasses='text-xs items-center'>
                            <Icon
                                iconName='square-2'
                                size='sm'
                                style='fas'
                            />{' '}
                            <span>Subtasks</span>
                        </Subtitle>
                        <Divider orientation='vertical' />
                        <Subtitle additionalClasses='text-xs'>
                            <Icon
                                iconName='square'
                                size='sm'
                                style='fas'
                                color='text-rose-600'
                            />{' '}
                            <span>Person</span>
                        </Subtitle>
                    </div>
                ) : null}
                <div className='px-2'></div>
            </div>

            <section>
                <AddToFavoriteBtn isInFavorite={isInFavorite} />
            </section>
        </div>
    );
};

export default TodoItem;

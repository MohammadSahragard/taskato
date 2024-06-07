'use client';

// public
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Card, CardBody } from '@nextui-org/react';
import DeleteTaskOption from '../ui/buttons/delete-task-option';
import ChangeCheckTaskOption from '../ui/buttons/change-check-task-option';
import ChangeImportantTaskOption from '../ui/buttons/change-important-task-option';
import Divider from '../ui/texts/divider';

//* redux
import { setIsShownMenu } from '@/redux/features/contextMenuSlice';
import DeleteListOption from '../ui/buttons/delete-list-option';
import RenameListOption from '../ui/buttons/rename-list-option';
import DeleteSubtaskOption from '../ui/buttons/delete-subtask-option';
import ChangeCheckSubtaskOption from '../ui/buttons/change-check-subtask-option';

const ContextMenu = () => {
    const dispatch = useDispatch();
    // states and variables
    const menuData = useSelector((state: any) => state.contextMenu);
    const { menuName, itemData, isShownMenu, menuPosition } = menuData;
    const position = {
        [menuPosition['XAxisSide']]: menuPosition.x,
        [menuPosition['YAxisSide']]: menuPosition.y,
    };

    // functions
    const closeMenu = () => {
        if (isShownMenu) {
            dispatch(setIsShownMenu(false));
        }
    };

    useEffect(() => {
        window.addEventListener('click', closeMenu);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShownMenu]);

    if (!isShownMenu) return;
    return (
        <Card
            className='context-menu'
            style={position}
        >
            <CardBody>
                {/* menu for tasks */}
                {menuName === 'tasks' ? (
                    <>
                        <ChangeCheckTaskOption
                            neededId={itemData.id}
                            isCompleted={itemData.isCompleted}
                            completionTransition={itemData.completionTransition}
                        />
                        <ChangeImportantTaskOption
                            neededId={itemData.id}
                            isImportant={itemData.isImportant}
                            importantTransition={itemData.importantTransition}
                        />
                        <Divider />
                        <DeleteTaskOption neededId={itemData.id} />
                    </>
                ) : null}

                {/* menu for lists */}
                {menuName === 'lists' ? (
                    <>
                        <RenameListOption onOpen={itemData.onOpen} />
                        <DeleteListOption id={itemData.id} />
                    </>
                ) : null}

                {/* menu for subtasks */}
                {menuName === 'subtasks' ? (
                    <>
                        <ChangeCheckSubtaskOption
                            isCompleted={itemData.isCompleted}
                            changeCheck={itemData.checkHandler}
                        />
                        <DeleteSubtaskOption neededId={itemData.id} />
                    </>
                ) : null}
            </CardBody>
        </Card>
    );
};

export default ContextMenu;

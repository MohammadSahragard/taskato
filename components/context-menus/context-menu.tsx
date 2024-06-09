'use client';

// public
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Card, CardBody } from '@nextui-org/react';
import DeleteTaskOption from '../ui/buttons/delete-task-option';
import ChangeCheckTaskOption from '../ui/buttons/change-check-task-option';
import ChangeImportantTaskOption from '../ui/buttons/change-important-task-option';
import Divider from '../ui/texts/divider';
// options
import DeleteListOption from '../ui/buttons/delete-list-option';
import RenameListOption from '../ui/buttons/rename-list-option';
import DeleteSubtaskOption from '../ui/buttons/delete-subtask-option';
import ChangeCheckSubtaskOption from '../ui/buttons/change-check-subtask-option';
import DeleteNoteOption from '../ui/buttons/delete-note-option';
import UpdateNoteOption from '../ui/buttons/update-note-option';

//* redux
import { setIsShownMenu } from '@/redux/features/context-menu/contextMenuSlice';

const ContextMenu = () => {
    const dispatch = useAppDispatch();
    // states and variables
    const menuData = useAppSelector((state) => state.contextMenu);
    const { menuName, itemData, isShownMenu, menuPosition } = menuData;
    const position = {
        [menuPosition['XAxisSide']]: menuPosition.x,
        [menuPosition['YAxisSide']]: menuPosition.y,
    };

    // functions
    const closeMenu = (event: any) => {
        const keydownCondition =
            event.type === 'keydown' && event.key === 'Escape' ? true : false;

        if (event.type === 'click' || keydownCondition) {
            if (isShownMenu) {
                dispatch(setIsShownMenu(false));
            }
        }
    };

    useEffect(() => {
        window.addEventListener('click', closeMenu);
        window.addEventListener('keydown', closeMenu);
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

                {/* menu for notes */}
                {menuName === 'notes' ? (
                    <>
                        <UpdateNoteOption onOpen={itemData.onOpen} />
                        <DeleteNoteOption neededId={itemData.id} />
                    </>
                ) : null}
            </CardBody>
        </Card>
    );
};

export default ContextMenu;

'use client';

// Public
import { useState, useEffect, useTransition } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Input,
} from '@nextui-org/react';
import { toast } from 'react-toastify';

//* Redux
import { getListsByEmail } from '@/redux/features/lists/listsSlice';
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

//* Functions
import { renameTaskList } from '@/helper/functions/task-functions';

const RenameListModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const listData = useAppSelector((state) => state.contextMenu.itemData);
    const [newListTitle, setNewListTitle] = useState('');
    const [isPending, startTransition] = useTransition();
    const isInvalid = !/^[\w\d-\s]+$/.test(newListTitle ?? '');

    // Functions
    const openModal = () => {
        setNewListTitle('Untitled list');
        onOpenChange(isOpen);
    };

    useEffect(() => {
        setNewListTitle(listData?.title ?? '');
    }, [listData.title]);

    const submitList = async (event: any) => {
        event.preventDefault();
        if (isInvalid) return;

        await renameTaskList(userEmail, listData.id, newListTitle).then(
            (res: any) => {
                // Set result message to toastify
                const messageStatus = res.status === 200 ? 'success' : 'error';
                toast[messageStatus](res.message);

                if (res.status === 200) {
                    onOpenChange(!isOpen);
                    dispatch(getListsByEmail(userEmail));

                    if (res.haveTask) {
                        dispatch(getTasksByEmail(userEmail));
                    }
                }
            }
        );
    };
    const onEnterDown = (event: any) => {
        if (event.key === 'Enter') {
            startTransition(() => submitList(event));
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={openModal}
            backdrop='blur'
            className='bg-primary-100'
        >
            <form
                onSubmit={(event: any) =>
                    startTransition(() => submitList(event))
                }
                onKeyDown={(event: any) => onEnterDown(event)}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Rename List</ModalHeader>

                            <ModalBody className='py-6'>
                                <Input
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='List Title'
                                    value={newListTitle}
                                    maxLength={20}
                                    onChange={({ target }) =>
                                        setNewListTitle(target.value)
                                    }
                                    autoFocus
                                    onFocus={(event: any) =>
                                        event.target.select()
                                    }
                                    isInvalid={isInvalid}
                                    errorMessage={
                                        isInvalid
                                            ? 'You can use a-z,0-9 and hyper.'
                                            : null
                                    }
                                />
                            </ModalBody>

                            <ModalFooter className='flex items-center justify-end gap-2 p-2'>
                                <Button
                                    variant='ghost'
                                    color='danger'
                                    onPress={onClose}
                                >
                                    Discard
                                </Button>
                                <Button
                                    color='primary'
                                    type='submit'
                                    isLoading={isPending}
                                    isDisabled={isInvalid}
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    );
};

export default RenameListModal;

'use client';

// public
import { useState, useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
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

//* redux
import { getListsByEmail } from '@/redux/features/taskListsSlice';
import { getTasksByEmail } from '@/redux/features/tasksSlice';

//* functions
import { renameTaskList } from '@/helper/functions/task-functions';

const RenameListModal = ({
    neededId,
    neededTitle,
    isOpen,
    onOpenChange,
}: {
    neededId: string;
    neededTitle?: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const [newListTitle, setNewListTitle] = useState<any>(neededTitle);
    const [isPending, startTransition] = useTransition();
    const isInvalid = !/^[\w\d-\s]+$/.test(newListTitle);

    // functions
    const openModal = () => {
        setNewListTitle('Untitled list');
        onOpenChange(isOpen);
    };

    const submitList = async (event: any) => {
        event.preventDefault();
        if (isInvalid) return;

        await renameTaskList(neededId, newListTitle ?? '').then((res: any) => {
            // set result message to toastify
            const messageStatus = res.status === 200 ? 'success' : 'error';
            toast[messageStatus](res.message);

            if (res.status === 200) {
                onOpenChange(!isOpen);
                dispatch(getListsByEmail(userEmail));

                if (res.haveTask) {
                    dispatch(getTasksByEmail(userEmail));
                }
            }
        });
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

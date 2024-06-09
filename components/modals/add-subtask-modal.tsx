'use client';

// Public
import { useState, useTransition } from 'react';
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
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';
import { updateSubtasks } from '@/redux/features/selected-task/selectedTaskSlice';

//* Functions
import { addSubtask } from '@/helper/functions/task-functions';

const AddSubtaskModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useAppDispatch();
    // States and variables
    const selectedTask = useAppSelector((state) => state.selectedTask);
    const [subtaskTitle, setSubtaskTitle] = useState('Untitled subtask');
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const [isPending, startTransition] = useTransition();

    // Functions
    const openModal = () => {
        setSubtaskTitle('Untitled subtask');
        onOpenChange(isOpen);
    };

    const submitSubtask = async (event: any) => {
        event.preventDefault();

        await addSubtask(selectedTask._id ?? '', subtaskTitle).then(
            (res: any) => {
                // Set result message to toastify
                const messageStatus = res.status === 200 ? 'success' : 'error';
                toast[messageStatus](res.message);

                if (res.status === 200) {
                    onOpenChange(!isOpen);
                    dispatch(getTasksByEmail(userEmail));
                    setSubtaskTitle('Untitled subtask');
                    dispatch(updateSubtasks(res?.data?.subtasks));
                }
            }
        );
    };
    const onEnterDown = (event: any) => {
        if (event.key === 'Enter') {
            startTransition(() => submitSubtask(event));
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
                    startTransition(() => submitSubtask(event))
                }
                onKeyDown={(event: any) => onEnterDown(event)}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Add subtask</ModalHeader>

                            <ModalBody className='py-6'>
                                <Input
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='Subtask'
                                    value={subtaskTitle}
                                    maxLength={25}
                                    onChange={({ target }) =>
                                        setSubtaskTitle(target.value)
                                    }
                                    autoFocus
                                    onFocus={(event: any) =>
                                        event.target.select()
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
                                >
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddSubtaskModal;

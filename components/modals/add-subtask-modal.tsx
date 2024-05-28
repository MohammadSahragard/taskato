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
import { getTasksByEmail } from '@/redux/features/tasksSlice';
import { updateSubtasks } from '@/redux/features/selectedTaskSlice';

//* functions
import { addSubtask } from '@/helper/functions/todo-functions';

const AddSubtaskModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const selectedTask = useSelector((state: any) => state.selectedTask);
    const [subtaskTitle, setSubtaskTitle] = useState('Untitled subtask');
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const [isPending, startTransition] = useTransition();

    // functions
    const openModal = () => {
        setSubtaskTitle('Untitled subtask');
        onOpenChange(isOpen);
    };

    const submitSubtask = async (event: any) => {
        event.preventDefault();

        await addSubtask(selectedTask._id, subtaskTitle).then((res: any) => {
            // set result message to toastify
            const messageStatus = res.status === 200 ? 'success' : 'error';
            toast[messageStatus](res.message);

            if (res.status === 200) {
                onOpenChange(!isOpen);
                dispatch(getTasksByEmail(userEmail));
                setSubtaskTitle('Untitled subtask');
                dispatch(updateSubtasks(res?.data?.subtasks));
            }
        });
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
            placement='center'
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

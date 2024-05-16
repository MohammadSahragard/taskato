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
    Tabs,
    Tab,
} from '@nextui-org/react';
import ResultSubmit from '../ui/texts/result-submit';

//* redux
import { getListsByEmail } from '@/redux/features/taskListsSlice';

//* functions
import { renameTaskList } from '@/helper/functions/todo-functions';

const RenameListModal = ({
    listId,
    listTitle,
    isOpen,
    onOpenChange,
}: {
    listId: string;
    listTitle: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const [newListTitle, setNewListTitle] = useState(listTitle);
    const [isPending, startTransition] = useTransition();
    const [showResult, setShowResult] = useState(false);
    const [resultSubmit, setResultSubmit] = useState({
        message: '',
        status: 200,
    });

    // functions
    const openModal = () => {
        setNewListTitle('Untitled list');
        onOpenChange(isOpen);
    };

    const submitList = async (event: any) => {
        event.preventDefault();

        await renameTaskList(listId, newListTitle).then((res: any) => {
            setShowResult(true);
            setResultSubmit({
                message: res.message,
                status: res.status,
            });

            setTimeout(() => {
                setShowResult(false);
                if (res.status === 200) {
                    onOpenChange(!isOpen);
                }
                dispatch(getListsByEmail(userEmail));
            }, 3000);
        });
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
                    startTransition(() => submitList(event))
                }
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
                                    onChange={({ target }) =>
                                        setNewListTitle(target.value)
                                    }
                                />
                            </ModalBody>

                            <ModalFooter className='flex items-center flex-col p-2'>
                                {showResult ? (
                                    <ResultSubmit
                                        text={resultSubmit.message}
                                        status={resultSubmit.status}
                                    />
                                ) : null}

                                <section className='self-end space-x-2'>
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
                                        Save
                                    </Button>
                                </section>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    );
};

export default RenameListModal;

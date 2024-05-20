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

//* data
import { listColorItems } from '@/helper/data/data';

//* functions
import { addTaskList } from '@/helper/functions/todo-functions';

//* redux
import { getListsByEmail } from '@/redux/features/taskListsSlice';

const AddListModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const [listColor, setListColor] = useState('#e11d48');
    const [listTitle, setListTitle] = useState('Untitled list');
    const [isPending, startTransition] = useTransition();
    const [showResult, setShowResult] = useState(false);
    const [resultSubmit, setResultSubmit] = useState({
        message: '',
        status: 200,
    });

    // functions
    const openModal = () => {
        setListTitle('Untitled list');
        onOpenChange(isOpen);
    };

    const submitList = async (event: any) => {
        event.preventDefault();

        await addTaskList({ email: userEmail, listTitle, listColor }).then(
            (res: any) => {
                setShowResult(true);
                setResultSubmit({
                    message: res.message,
                    status: res.status,
                });

                setTimeout(() => {
                    setShowResult(false);
                    if (res.status === 200) {
                        onOpenChange(!isOpen);
                        setListTitle('Untitled list');
                        setListColor('#e11d48');
                        dispatch(getListsByEmail(userEmail));
                    }
                }, 1800);
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
            placement='center'
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
                            <ModalHeader>Add List</ModalHeader>

                            <ModalBody className='py-6'>
                                <Input
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='List Title'
                                    value={listTitle}
                                    onChange={({ target }) =>
                                        setListTitle(target.value)
                                    }
                                    autoFocus
                                    onFocus={(event: any) =>
                                        event.target.select()
                                    }
                                />
                                <Tabs
                                    fullWidth
                                    classNames={{
                                        tabList:
                                            'bg-transparent justify-center',
                                        cursor: 'outline outline-primary outline-offset-2 !bg-transparent',
                                    }}
                                    onSelectionChange={(key: any) =>
                                        setListColor(key)
                                    }
                                >
                                    {listColorItems.map((color: string) => (
                                        <Tab
                                            key={color}
                                            style={{ backgroundColor: color }}
                                            className={`h-8 w-8`}
                                        />
                                    ))}
                                </Tabs>
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
                                        Add
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

export default AddListModal;

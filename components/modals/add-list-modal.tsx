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
    Tabs,
    Tab,
} from '@nextui-org/react';
import { toast } from 'react-toastify';

//* Data
import { listColorItems } from '@/helper/data/data';

//* Functions
import { addTaskList } from '@/helper/functions/task-functions';

//* Redux
import { getListsByEmail } from '@/redux/features/lists/listsSlice';

const AddListModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const [listColor, setListColor] = useState('#e11d48');
    const [listTitle, setListTitle] = useState('Untitled list');
    const [isPending, startTransition] = useTransition();
    const isInvalid = !/^[\w\d-\s]+$/.test(listTitle);

    // Functions
    const openModal = () => {
        setListTitle('Untitled list');
        onOpenChange(isOpen);
    };

    const submitList = async (event: any) => {
        event.preventDefault();
        if (isInvalid) return;

        await addTaskList({
            email: userEmail,
            list_title: listTitle,
            list_color: listColor,
        }).then((res: any) => {
            // Set result message to toastify
            const messageStatus = res.status === 200 ? 'success' : 'error';
            toast[messageStatus](res.message);

            if (res.status === 200) {
                onOpenChange(!isOpen);
                setListTitle('Untitled list');
                setListColor('#e11d48');
                dispatch(getListsByEmail(userEmail));
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
                            <ModalHeader>Add List</ModalHeader>

                            <ModalBody className='py-6'>
                                <Input
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='List Title'
                                    value={listTitle}
                                    maxLength={20}
                                    onChange={({ target }) =>
                                        setListTitle(target.value)
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

export default AddListModal;

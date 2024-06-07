'use client';

// public
import { useState, useTransition } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tab,
    Tabs,
    Button,
    Input,
    Textarea,
} from '@nextui-org/react';
import { toast } from 'react-toastify';

//* data
import { listColorItems } from '@/helper/data/data';

//* functions
import { addNote } from '@/helper/functions/notes-functions';

//* redux
import { getNotesByEmail } from '@/redux/features/notesSlice';

const AddStickyNoteModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const [noteColor, setNoteColor] = useState('#e11d48');
    const [noteTitle, setNoteTitle] = useState('Untitled note');
    const [noteContent, setNoteContent] = useState('');
    const [isPending, startTransition] = useTransition();

    // functions
    const openModal = () => {
        setNoteTitle('Untitled note');
        setNoteContent('');
        onOpenChange(isOpen);
    };

    const submitNote = async (event: any) => {
        event.preventDefault();

        await addNote(
            {
                note_title: noteTitle,
                note_content: noteContent,
                note_color: noteColor,
            },
            userEmail
        ).then((res: any) => {
            // set result message to toastify
            const messageStatus = res.status === 200 ? 'success' : 'error';
            toast[messageStatus](res.message);

            if (res.status === 200) {
                onOpenChange(!isOpen);
                setNoteTitle('Untitled note');
                setNoteContent('');
                setNoteColor('#e11d48');
                dispatch(getNotesByEmail(userEmail));
            }
        });
    };
    const onEnterDown = (event: any) => {
        if (event.key === 'Enter') {
            startTransition(() => submitNote(event));
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
                    startTransition(() => submitNote(event))
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
                                    placeholder='Note Title'
                                    value={noteTitle}
                                    maxLength={20}
                                    onChange={({ target }) =>
                                        setNoteTitle(target.value)
                                    }
                                    autoFocus
                                    onFocus={(event: any) =>
                                        event.target.select()
                                    }
                                />
                                <Textarea
                                    variant='bordered'
                                    radius='sm'
                                    label='Note'
                                    value={noteContent}
                                    onChange={({ target }) =>
                                        setNoteContent(target.value)
                                    }
                                    placeholder='Enter your note content'
                                />
                                <Tabs
                                    fullWidth
                                    classNames={{
                                        tabList:
                                            'bg-transparent justify-center',
                                        cursor: 'outline outline-primary outline-offset-2 !bg-transparent',
                                    }}
                                    onSelectionChange={(key: any) =>
                                        setNoteColor(key)
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

export default AddStickyNoteModal;

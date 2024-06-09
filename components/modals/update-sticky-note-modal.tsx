'use client';

// public
import { useEffect, useState, useTransition } from 'react';
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
import { updateNote } from '@/helper/functions/notes-functions';

//* redux
import { getNotesByEmail } from '@/redux/features/notes/notesSlice';

const UpdateStickyNoteModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const noteData = useAppSelector((state) => state.contextMenu.itemData);
    const [noteTitle, setNoteTitle] = useState('Untitled note');
    const [noteContent, setNoteContent] = useState('');
    const [isPending, startTransition] = useTransition();

    // functions
    const submitUpdateNote = async (event: any) => {
        event.preventDefault();

        await updateNote({
            _id: noteData.id,
            note_title: noteTitle,
            note_content: noteContent,
        }).then((res: any) => {
            // set result message to toastify
            const messageStatus = res.status === 200 ? 'success' : 'error';
            toast[messageStatus](res.message);

            if (res.status === 200) {
                onOpenChange(!isOpen);
                dispatch(getNotesByEmail(userEmail));
            }
        });
    };
    const onEnterDown = (event: any) => {
        if (event.key === 'Enter') {
            startTransition(() => submitUpdateNote(event));
        }
    };

    useEffect(() => {
        setNoteTitle(noteData?.title ?? '');
        setNoteContent(noteData?.content ?? '');
    }, [noteData]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop='blur'
            className='bg-primary-100'
        >
            <form
                onSubmit={(event: any) =>
                    startTransition(() => submitUpdateNote(event))
                }
                onKeyDown={(event: any) => onEnterDown(event)}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Update Sticky Note</ModalHeader>

                            <ModalBody className='py-6'>
                                <Input
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='Note Title'
                                    value={noteTitle}
                                    isRequired
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
                                    isRequired
                                    onChange={({ target }) =>
                                        setNoteContent(target.value)
                                    }
                                    placeholder='Enter your note content'
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
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    );
};

export default UpdateStickyNoteModal;

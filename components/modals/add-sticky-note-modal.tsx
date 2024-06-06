'use client';

// public
import { useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//* components
import {
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

const AddStickyNoteModal = () => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const [noteColor, setNoteColor] = useState('#e11d48');
    const [noteTitle, setNoteTitle] = useState('Untitled note');
    const [noteContent, setNoteContent] = useState('');
    const [isPending, startTransition] = useTransition();

    return (
        <form>
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
                                onFocus={(event: any) => event.target.select()}
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
                                    tabList: 'bg-transparent justify-center',
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
    );
};

export default AddStickyNoteModal;

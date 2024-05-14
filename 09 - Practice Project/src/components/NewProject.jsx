import { useRef } from 'react';
import Input from './Input';
import Modal from './Modal';

export default function NewProject({ onAdd, onCancel }) {
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const handleSave = () => {
        const enteredTitle = title.current.value.trim();
        const enteredDescription = description.current.value.trim();
        const enteredDueDate = dueDate.current.value.trim();

        if (
            enteredTitle       === '' ||
            enteredDescription === '' ||
            enteredDueDate     === ''
        ) {
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        });
    }


    return (
        <>
            <Modal ref={modal}>
                <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Oops. Looks like you forgot to enter a value.</p>
                <p className='text-stone-600 mb-4'>Please fill in all input fields.</p>
            </Modal>
            <div className='w-[35rem] mt-16'>
                <menu className='flex items-center justify-end gap-4 my-4'>
                    <li><button className='text-stone-500 hover:text-stone-950' onClick={onCancel}>Cancel</button></li>
                    <li><button className='rounded-md px-6 py-2 bg-stone-800 text-stone-50 hover:bg-stone-950' onClick={handleSave}>Save</button></li>
                </menu>
                <div>
                    <Input ref={title} label='Title' type='text' />
                    <Input ref={description} label='Description' isTextArea={true} />
                    <Input ref={dueDate} label='Due Date' type='date' />
                </div>
            </div>
        </>
    );
}

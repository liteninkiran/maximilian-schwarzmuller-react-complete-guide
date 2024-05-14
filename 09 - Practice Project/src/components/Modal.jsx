import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const ModalFn = ({ children, buttonCaption = 'Close' }, ref) => {
    const dialogRef = useRef();
    const x = {
        open: () => dialogRef.current.showModal()
    }
    useImperativeHandle(ref, () => x);
    const dialog = (
        <dialog ref={dialogRef} className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'>
            {children}
            <form method='dialog' className='mt-4 text-right'>
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>
    );
    const root = document.getElementById('modal-root');
    return createPortal(dialog, root);
}

const Modal = forwardRef(ModalFn);

export default Modal;

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ModalFn = ({ children, buttonCaption = 'Close' }, ref) => {
    const dialogRef = useRef();
    const x = {
        open: () => dialogRef.current.showModal()
    }
    useImperativeHandle(ref, () => x);
    const dialog = (
        <dialog ref={dialogRef}>
            {children}
            <form method='dialog'>
                <button>{buttonCaption}</button>
            </form>
        </dialog>
    );
    const root = document.getElementById('modal-root');
    return createPortal(dialog, root);
}

const Modal = forwardRef(ModalFn);

export default Modal;

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, open, className = '', onClose }) => {
    const dialogRef = useRef();

    useEffect(() => {
        const modal = dialogRef.current;
        if (open) {
            modal.showModal();
        }
        return () => modal.close();
    }, [open]);

    const dialog = (
        <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>
    );

    return createPortal(dialog, document.getElementById('modal'));
}

export default Modal;

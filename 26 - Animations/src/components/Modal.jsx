import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
    const initial = { opacity: 0, y: 200 }
    const animate = { opacity: 1, y: 0 }
    const modal = (<>
        <div className='backdrop' onClick={onClose} />
        <motion.dialog initial={initial} animate={animate} open className='modal'>
            <h2>{title}</h2>
            {children}
        </motion.dialog>
    </>);
    return createPortal(modal, document.getElementById('modal'));
}

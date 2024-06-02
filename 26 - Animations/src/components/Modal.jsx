import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
    const hidden = { opacity: 0, y: 200 }
    const visible = { opacity: 1, y: 0 }
    const variants = { hidden, visible }
    const modal = (<>
        <div className='backdrop' onClick={onClose} />
        <motion.dialog variants={variants} initial='hidden' animate='visible' exit='hidden' open className='modal'>
            <h2>{title}</h2>
            {children}
        </motion.dialog>
    </>);
    return createPortal(modal, document.getElementById('modal'));
}

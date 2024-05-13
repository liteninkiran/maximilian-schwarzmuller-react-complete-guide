import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(
    function ResultModal({ targetTime, remainingTime, onReset }, ref) {
        const dialog = useRef();
        const userLost = remainingTime <= 0;
        useImperativeHandle(ref, () => ({ open: () => dialog.current.showModal() }));
        return (
            <dialog className='result-modal' ref={dialog}>
                {userLost && <h2>You lost</h2>}
                <p>The target time was <strong>{targetTime} seconds</strong></p>
                <p>You stopped the time with <strong>{(remainingTime / 1000).toFixed(2)} seconds left</strong></p>
                <form method='dialog' onSubmit={onReset}>
                    <button>
                        Close
                    </button>
                </form>
            </dialog>
        );
    }
);

export default ResultModal;

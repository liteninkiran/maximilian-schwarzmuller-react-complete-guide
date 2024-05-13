import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(
    function ResultModal({ targetTime, remainingTime, onReset }, ref) {
        const dialog = useRef();
        const userLost = remainingTime <= 0;
        const score = Math.round((1 - remainingTime / targetTime / 1000) * 100);
        useImperativeHandle(ref, () => ({ open: () => dialog.current.showModal() }));
        return (
            <dialog className='result-modal' ref={dialog} onClose={onReset}>
                {
                    userLost ? (
                        <h2>You lost</h2>
                    ) : (
                        <>
                            <h2>You Won</h2>
                            <h3>Your Score: {score}</h3>
                        </>
                    )
                }
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

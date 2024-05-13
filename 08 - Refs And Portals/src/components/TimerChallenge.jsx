import { useState } from 'react';

export default function TimerChallenge({ title, targetTime }) {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const handleStart = () => {
        setTimerStarted(true);
        setTimeout(() => setTimerExpired(true), targetTime * 1000);
    }
    const handleStop = () => {

    }
    return (
        <section className='challenge'>
            <h2>
                {title}
            </h2>
            {timerExpired && <p>You Lost</p>}
            <p className='challenge-time'>
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={handleStart}>
                    {timerStarted ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Timer is running...' : 'Timer inactive'}
            </p>
        </section>
    );
}

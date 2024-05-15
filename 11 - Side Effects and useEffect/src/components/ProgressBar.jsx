import { useEffect, useState } from 'react';

const INTERVAL = 10;

export default function ProgressBar({ timer }) {
    const [remainingTime, setRemainingTime] = useState(timer);
    useEffect(() => {
        const interval = setInterval(() => setRemainingTime(prev => prev - INTERVAL), INTERVAL);
        return () => clearInterval(interval);
    }, []);
    return (
        <progress value={remainingTime} max={timer} />
    );
}

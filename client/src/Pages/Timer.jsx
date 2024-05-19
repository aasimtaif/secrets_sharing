import React, { useState, useEffect } from 'react';
import './Timer.css';
const Timer = () => {
    const [seconds, setSeconds] = useState(55);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;

    return (
        <div className="timer-container">
            <span className="timer-text">{formattedTime}</span>
        </div>
    );
};

export default Timer;
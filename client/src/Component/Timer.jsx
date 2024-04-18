// import React, { useState, useEffect } from 'react';

// const Timer = ({ targetDate }) => {
//   const calculateTimeLeft = () => {
//     const difference = +new Date(targetDate) - +new Date();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60)
//       };
//     }
//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);
//     return () => clearTimeout(timer);
//   });

//   const timerComponents = [];
//   Object.keys(timeLeft).forEach(interval => {
//     if (!timeLeft[interval]) {
//       return;
//     }
//     timerComponents.push(
//       <span>
//         {timeLeft[interval]} {interval}{" "}
//       </span>
//     );
//   });

//   return (
//     <div>
//       {timerComponents.length ? timerComponents : <span>Time's up!</span>}
//     </div>
//   );
// };

// export default Timer;


import React from 'react';
import Countdown from 'react-countdown-now';
import './Timer.css'
// const targetDate = Date.now() + 17080104 ; // Replace with your target end time in milliseconds

const Timer = ({targetDate}) => {
    return (
        <div className='timer'>
            The text is visible for:
            <br/>
            <Countdown date={targetDate} daysInHours>
                <span>{({ days, hours, minutes, seconds }) => {
                    // Display the remaining time
                    return (
                        <div className='timer'>
                            <div>{days} days</div>
                            <div>{hours} hours</div>
                            <div>{minutes} minutes</div>
                            <div>{seconds} seconds</div>
                        </div>
                    );
                }}</span>
            </Countdown>
        </div>
    );
};

export default Timer;

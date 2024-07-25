import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OtpTimer = ({ initialTime = 120 }) => {

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (timeLeft === 0) 
        return;
      
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className="w-full flex justify-start items-center gap-x-1">
      <p>Time left:</p> 
      <label className="text-[var(--primary)] font-bold">{formatTime(timeLeft)}</label>
      <p>second</p>
    </div>
  );
};

OtpTimer.propTypes = {
    initialTime: PropTypes.number
};
  
export default OtpTimer;

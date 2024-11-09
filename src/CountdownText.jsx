import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

function CountdownText (props, ref) {

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(minutes * 60);
    const intervalRef = useRef(null);
  
  
    const setTimeMins = (timeMins) => {
      clearInterval(intervalRef.current);
      setTotalSeconds(timeMins * 60);
    }
  
    const start = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    }
  
  
  
    //run when total seconds changes and triggers re-render
    useEffect(() => {
      setMinutes(Math.floor(totalSeconds / 60));
      setSeconds(totalSeconds % 60);
  
      if (totalSeconds == 0) {
        clearInterval(intervalRef.current);
      }
    }, [totalSeconds]);
  
  
    useImperativeHandle(ref, () => ({
      setTimeMins, start,
    })
    )
  
    return (
      <>
        <h1 className="text-white text-5xl">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
      </>
    );
  
  }

  export default forwardRef(CountdownText);
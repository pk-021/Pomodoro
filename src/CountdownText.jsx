import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

function CountdownText({setIsRunning}, ref) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(minutes * 60);
  const intervalRef = useRef(null);

  //run when total seconds changes and triggers re-render
  useEffect(() => {
    setMinutes(Math.floor(totalSeconds / 60));
    setSeconds(totalSeconds % 60);

    if (totalSeconds <= 0) {
      clearInterval(intervalRef.current);
      // setTimeout(()=>{setIsRunning(false)},1000);
      setIsRunning(false);
    }
  }, [totalSeconds]);

  const setTimeMins = (timeMins) => {
    clearInterval(intervalRef.current);
    setTotalSeconds(timeMins * 60);
  }

  const start = () => {
    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => prev - 1);
    }, 1000);
  }

  const pause = () =>{
    clearInterval(intervalRef.current);
  }



  useImperativeHandle(ref, () => ({
    setTimeMins, start,pause
  })
  )

  return (
    <>
      <h1 className="text-white font-sourGummy text-[150px]
        absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
    </>
  );

}

export default forwardRef(CountdownText);
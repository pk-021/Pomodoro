import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";


// Counter Circle Component
function CountdownCircle({ updateRate }, ref) {

  const intervalRef = useRef(null);
  const circleRef = useRef(null);

  const strokeLen = useRef(0);
  const strokeOffset = useRef(0);
  const time = useRef(0);


  useEffect(() => {
    if (circleRef.current) {
      strokeLen.current = circleRef.current.getTotalLength();
      circleRef.current.style.strokeDashoffset= strokeLen.current;  //offset maximum initially, Countdown invisible
    }
  }, [])

  const setTimeMins = (mins) => {
    clearInterval(intervalRef.current);
    time.current = mins * 60 * 1000;
    strokeOffset.current = 0;    
  };



  const startAnimation = (startAnimationDuration) => {
    clearInterval(intervalRef.current);
    circleRef.current.style.transition = `${startAnimationDuration / 1000}s ease-in-out`;
    console.log("inside startAnimation");
    circleRef.current.style.strokeDashoffset = 0;
  };

  const start = () => {
    circleRef.current.style.transition = `${updateRate / 1000}s linear`;
    const strokeIncrements = updateRate / time.current * strokeLen.current; //update twice every second

    function updateCircle() {
      strokeOffset.current += strokeIncrements;

      if (strokeOffset.current < strokeLen.current) {
        console.log(strokeOffset.current);
        circleRef.current.style.strokeDashoffset = strokeOffset.current;
        return strokeOffset.current;
      }
      else {
        console.log("offset = strokelen ")
        circleRef.current.style.strokeDashoffset = strokeLen.current;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    //starting the updates
    if (circleRef.current) {
      intervalRef.current = setInterval(updateCircle, updateRate);
    }
  }

  const pause = () => {
    clearInterval(intervalRef.current);
  }
  
    const reset = ()=>
    {
      clearInterval(intervalRef.current);
      circleRef.current.style.strokeDashoffset= strokeLen.current
      strokeOffset.current = 0;
    }

  useImperativeHandle(ref, () => ({
    start, setTimeMins, startAnimation, pause,reset
  }));

  return (

    <svg className=" [stroke-dasharray:56.556636810302734]" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path ref={circleRef} id="circleStroke" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );


};


export default forwardRef(CountdownCircle);
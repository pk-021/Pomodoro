import { useEffect, useRef, useState } from "react";

// Counter Circle Component
function CountdownCircle(props, ref) {

  const circleRef = useRef(null);
  const [strokeLen,setStrokeLen] = useState(0);
  

  // const strokeOffset = useRef(0);
  // const time = useRef(0);


  function startAnimation() {

    circleRef.current.style.transition = `${props.startAnimationDuration / 1000}s ease-in-out`;
    circleRef.current.style.strokeDashoffset = 0;
    console.log("inside startAnimation");
  };




  useEffect(() => {
    if (circleRef.current) {
      setStrokeLen(circleRef.current.getTotalLength());
      console.log("inside the startup useeffect");
    }
  }, [])




  return (

    <svg
      width="800px" height="800px"
      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path ref={circleRef}
        style={{
          strokeDasharray: strokeLen,
          strokeDashoffset: props.isRunning?(strokeLen - (props.currTime / props.totalTime * strokeLen)):strokeLen,
        }}
        id="circleStroke" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

}
export default CountdownCircle;
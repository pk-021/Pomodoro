import { useEffect, useRef, useState } from "react";
import CountdownText from "./CountdownText";

function CountdownRing(props, ref) {

  const [strokeLen, setStrokeLen] = useState(null);
  const circleRef = useRef(null);
  const circleTransition = useRef('')

  // if (props.animateStartup) {
  //   circleTransition.current = '';
  // }
  // else {
  //   circleTransition.current = `${props.refreshRate / 1000}s linear`;
  // }
  circleTransition.current = ``;
  //the 1s lag issue can be fixed by running the setremainint in app every refresh rate and removing the transition


  useEffect(() => {
    if (circleRef.current) {
      const stroke = circleRef.current.getTotalLength()
      setStrokeLen(stroke);
    }
  }, [])


  // upper makes initial empty
  const strokeDashoffset = props.isRunning ? (strokeLen - (props.remaining / props.totalTime * strokeLen)) : (strokeLen);
  // const strokeDashoffset = props.isRunning ? (strokeLen - (props.remaining / props.totalTime * strokeLen)) : (0);
  return (
    <>
      <svg
        width="800px" height="800px"
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >

        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 
                    3C16.9706 3 21 7.02944 21 12Z" className="stroke-neutral-500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        <path ref={circleRef}
          style={{
            transition: circleTransition.current,
            offsetRotate:90,
            strokeDasharray: strokeLen,
            strokeDashoffset: props.animateStartup ? 0 : strokeDashoffset, //I am SOOOO HAPPPYYYYY animaton before timer logic
            '--startOffset': strokeDashoffset,
            '--endOffset': 0,
            '--startupAnimationDuration': `${props.startupAnimationDuration / 1000}s `,
          }}
          
          className={`${props.animateStartup ? 'animate-startCircleTimer' : ''} stroke-neutral-50`}
          id="circleStroke" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 
          3C16.9706 3 21 7.02944 21 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <CountdownText time={props.remaining}></CountdownText>
    </>
  );

}
export default CountdownRing;
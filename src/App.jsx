import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

import CountdownCircle from "./CountdownCircle";
import CountdownText from "./CountdownText";
import Settings from "./Settings";
import Skip from "./skip";

function App() {
  const animationDuration = 500;
  const refreshRate = 1000;
  const [isRunning, setIsRunning] = useState(false);
  const [isCounting, setIsCounting] = useState(false); 



  const [totalTime, setTotalTime] = useState(40000);
  const [currTime, setCurrTime] = useState(totalTime);

  const intervalRef = useRef(null);


  function updateCountdown() {
    if (isCounting && isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current);
            setIsCounting(false);
            setIsRunning(false);
            return 0;
          }

          else {
            return (prevTime - refreshRate);
          }
        })
      }, refreshRate)
    }
    else {
      clearInterval(intervalRef.current);
    }
  }
  useEffect(updateCountdown, [isRunning, isCounting]);


  return (
    <div className="flex flex-col items-center">
      <div id="countdown" className="relative felx items-center justify-center">
        <CountdownCircle isRunning={isRunning} totalTime={totalTime} currTime={currTime} />
        <CountdownText time={currTime} />
      </div>

      <div className="userControls flex relative h-fit justify-center items-center">
        <button
          className={`px-16 ${isCounting ? "py-3" : "py-5"
            } z-10 h-fit
             text-4xl text-purple-500 font-semibold font-mono
            bg-white rounded-lg`}
          onClick={() => {
            if (isRunning) {
              if (isCounting) {
                setIsCounting(false);
              }
              else {
                setIsCounting(true);
              }
            }
            else {

              setIsRunning(true);
              setIsCounting(true);
              setTimeout(() => {
              }, animationDuration);

            }


          }}
        >
          {(isCounting & isRunning) ? "PAUSE" : "START"}
        </button>
        <Skip resetFun={reset} />

      </div>

      <Settings setPomodoroMins={(timeMins) => {
        setIsCounting(false);
        setIsRunning(false);
      }} />

    </div>



  );

  function reset() {
    console.log("clicked skip");
    setIsCounting(false);
    setIsRunning(false);
  }

}



export default App;

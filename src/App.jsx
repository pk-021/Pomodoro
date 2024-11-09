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

function App() {
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const animationDuration = 500;

  const [isRunning, setIsRunning] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [timeMins, setTimeMins] = useState(0.1);

  useEffect(() => {
    console.log("useeffect A in app.jsx");

    circleRef.current.setTimeMins(timeMins);
    textRef.current.setTimeMins(timeMins);
  }, [timeMins]);

  useEffect(()=>
  {
    if(!isRunning)
    {
      console.log("useeffect B in app.jsx");
      circleRef.current.setTimeMins(timeMins);
      textRef.current.setTimeMins(timeMins);
    }
  },[isRunning]);

  return (
    <div className="flex flex-col items-center">
      <div id="countdown" className="relative">
        <CountdownCircle updateRate={1000} ref={circleRef} />
        <CountdownText setIsRunning={setIsRunning} ref={textRef} />

        <button
          className={`px-16 ${isCounting ? "py-3" : "py-5"
            } z-10 absolute -bottom-20 left-1/2 -translate-x-1/2
            text-4xl text-purple-500 font-semibold font-mono
          bg-white  rounded-lg`}
          onClick={() => {
            if (circleRef.current && textRef.current) {

              if (isRunning) {
                if (isCounting) {
                  circleRef.current.pause();
                  textRef.current.pause();
                  setIsCounting(false);
                }
                else {
                  setIsCounting(true);
                  circleRef.current.start();
                  textRef.current.start();
                }
              }
              else {
                circleRef.current.startAnimation(animationDuration);
                textRef.current.setTimeMins(timeMins);
                circleRef.current.setTimeMins(timeMins);

                setIsRunning(true);
                setIsCounting(true);

                setTimeout(() => {
                  circleRef.current.start();
                  textRef.current.start();
                }, animationDuration);

              }

            }
          }}
        >
          {(isCounting&isRunning)? "PAUSE" : "START"}
        </button>
      </div>
      <Settings setPomodoroMins={setTimeMins} />
    </div>
  );
}

export default App;

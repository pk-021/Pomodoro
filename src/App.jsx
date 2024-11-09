import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import CountdownCircle from "./CountdownCircle";
import CountdownText from "./CountdownText";
import Settings from "./Settings";

function App() {
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const animationDuration = 500;

  const [timeMins, setTimeMins] = useState(1);

  useEffect(() => {
    console.log("minutes changed");
    circleRef.current.setTimeMins(timeMins);
    textRef.current.setTimeMins(timeMins);
  }, [timeMins]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col h-screen items-center justify-center">

          <CountdownCircle updateRate={1000} ref={circleRef} />

          <button className="bg-white rounded-lg px-10 py-5 z-10 text-lg font-semibold"
            onClick={() => {
              if (circleRef.current && textRef.current) {

                circleRef.current.startAnimation(animationDuration);
                textRef.current.setTimeMins(timeMins);
                circleRef.current.setTimeMins(timeMins);

                setTimeout(() => {
                  circleRef.current.start();
                  textRef.current.start();
                  console.log("timeout Done");
                }, animationDuration);
              }
            }}
          >
            Start
          </button>

          <CountdownText min={12} ref={textRef} />
        </div>
        <Settings setPomodoroMins={setTimeMins}/>
      </div>
    </>
  )
}





export default App;
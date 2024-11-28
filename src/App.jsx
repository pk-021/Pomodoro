import { isValidElement, useDeferredValue, useEffect, useRef, useState } from "react";

import CountdownCircle from "./CountdownCircle";
import CountdownText from "./CountdownText";
import Settings from "./Settings";
import Skip from "./skip";
import Mode from "./Mode";

function App() {

  const refreshRate = 1000;
  const [duration, setDuration] = useState(10000);
  const [remaining, setRemaining] = useState(duration);

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const [isPomodoro, setIsPomodro] = useState(false);
  const [isShortBreak, setIsShortBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);


  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const [animateStartup, setAnimateStartup] = useState(false);


  const startTime = useRef(null);
  const pauseTime = useRef(null);
  const pauseDuration = useRef(0);
  const stopId = useRef(null);

  const startupAnimationDuration = 1000;


  function handleButtonClick() {
    if (isRunning) {
      isPaused ? resumeTimer() : pauseTimer();
    }
    else {

      setAnimateStartup(true);
      setTimeout(() => {
        setAnimateStartup(false);
        setRemaining(duration);
        setIsRunning(true);
        setIsPaused(false);
        pauseDuration.current = 0;
        startTime.current = Date.now();
        if (!stopId.current) {
          stopId.current = window.requestAnimationFrame(stepTimer);
        }
      }, 1000
      )
    }
  }

  const stepTimer = () => {
    const elapsed = Date.now() - startTime.current - pauseDuration.current;
    const newRemaining = Math.max(duration - elapsed, 0);

    if (elapsed % refreshRate < 16) {
      setRemaining(newRemaining);
    }

    if (newRemaining > 0) {
      stopId.current = requestAnimationFrame(stepTimer); // Continue the timer
    } else {
      setRemaining(0);
      playTimerEnd();
      setTimeout(resetTimer, refreshRate);
      console.log("Timer completed!")
    }
  };

  function pauseTimer() {
    cancelAnimationFrame(stopId.current);
    pauseTime.current = Date.now();
    setIsPaused(true);
  }

  function resumeTimer() {
    if (pauseTime.current) {
      pauseDuration.current += Date.now() - pauseTime.current;
    }
    setIsPaused(false);
    stopId.current = requestAnimationFrame(stepTimer);
  }




  function handlePomodroClick() {
    console.log(isPomodoro);
    resetTimer(25 * 60 * 1000);
    setIsPomodro(true);
    setIsShortBreak(false);
    setIsLongBreak(false);
  }

  function handleShortBreakClick() {
    resetTimer(5 * 60 * 1000);
    setIsPomodro(false);
    setIsShortBreak(true);
    setIsLongBreak(false);
  }

  function handleLongBreakClick() {
    resetTimer(15 * 60 * 1000);
    setIsPomodro(false);
    setIsShortBreak(false);
    setIsLongBreak(true);
  }

  // useEffect(updateCountdown, [isRunning, isCounting]);
  function resetTimer(_duration = duration) {
    if (stopId.current) {
      cancelAnimationFrame(stopId.current);
      stopId.current = null;
    };
    setIsPaused(true);
    setIsRunning(false);

    pauseDuration.current = 0;
    startTime.current = null;
    setDuration(_duration);
    setRemaining(_duration);
  }
  return (
    <div className="flex flex-col items-center">

      <Mode
        isPomodoro={isPomodoro}
        isLongBreak={isLongBreak}
        isShortBreak={isShortBreak}
        handlePomodroClick={handlePomodroClick}
        handleShortBreakClick={handleShortBreakClick}
        handleLongBreakClick={handleLongBreakClick} />

      <div id="countdown" className="relative felx items-center justify-center">
        <CountdownCircle
          isRunning={isRunning}
          totalTime={duration}
          remaining={remaining}
          refreshRate={refreshRate}
          startupAnimationDuration={startupAnimationDuration}
          animateStartup={animateStartup} />

        <CountdownText time={remaining} />

      </div>

      <div className="userControls flex relative h-fit justify-center items-center">
        <button
          className={`px-16 ${isPaused ? "py-5" : "py-3"} z-10 h-fit
          text-4xl text-purple-500 font-semibold font-mono bg-white rounded-lg`}
          onClick={handleButtonClick}
        >
          {(isRunning && (!isPaused)) ? "PAUSE" : "START"}
        </button>
        <Skip resetFun={() => { resetTimer(duration) }} />
      </div>

      <Settings
        currentDuration={duration}
        visibility={settingsVisibility}
        setVisibility={setSettingsVisibility}
        setDuration={(time) => {
          resetTimer(time);
        }}
      />
    </div>
  );
}


function playTimerEnd() {
  const audio = new Audio("ting.mp3");
  audio.play();
}
export default App;


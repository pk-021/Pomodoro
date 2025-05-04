import { isValidElement, useDeferredValue, useEffect, useRef, useState } from "react";

import SimpleTextCounter from "./SimpleTextCounter";
import CountdownRing from "./CountdownRing";
import CountdownCircle from "./CountdownCirle";
import SegmentedDisplay from "./SegmentedDisplay";
import AnalogTimer from "./AnalogTimer";

import TimerControls from "./TimerControls";
import Settings from "./Settings";
import Mode from "./Mode";
const audio = new Audio("ting.mp3");


function App() {


  const refreshRate = 1000;
  const [duration, setDuration] = useState(10000);
  const [remaining, setRemaining] = useState(duration);

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const isPomodoro = useRef(true);
  const isShortBreak = useRef(false);
  const isLongBreak = useRef(false);

  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const [animateStartup, setAnimateStartup] = useState(false);

  const startTime = useRef(null);
  const pauseTime = useRef(null);
  const pauseDuration = useRef(0);
  const stopId = useRef(null);
  const remainingRef = useRef(remaining);


  const pomodoroTime = useRef(6000);
  const shortBreakTime = useRef(5 * 60 * 1000);
  const longBreakTime = useRef(15 * 60 * 1000);

  
  const clockFaces = {
    simple: SimpleTextCounter,
    ring: CountdownRing,
    pie: CountdownCircle,
    segmented: SegmentedDisplay,
    analog: AnalogTimer
  }
  const [selectedFace, setSelectedFace] = useState('ring');
  const CurrentClockFace = clockFaces[selectedFace]
  
  const startupAnimationDuration = 1000;

  useEffect(() => {
    return () => {
      if (stopId.current) {
        cancelAnimationFrame(stopId.current);
      }
    };
  }, []);

  function requestNotificationPermission() {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        }
      });
    }
  }

  function showNotification(title, options) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, options);
    }
  }
  
  


  function handlePlaybackClick() {
    if (isRunning) {
      isPaused ? resumeTimer() : pauseTimer();
    }
    else {
      // delay for animation logic here
      setAnimateStartup(false);
      setRemaining(duration);
      requestNotificationPermission();
      setIsRunning(true);
      setIsPaused(false);
      pauseDuration.current = 0;
      startTime.current = Date.now();
      if (!stopId.current) {
        stopId.current = window.requestAnimationFrame(stepTimer);
      }
    }
  }

  useEffect(() => {
    remainingRef.current = remaining;
  }, [remaining]);

  
  const lastFrameTime =useRef(0);
  const stepTimer = (timeStamp) => {
    const elapsed = Date.now() - startTime.current - pauseDuration.current;
    const newRemaining = Math.max(duration - elapsed, 0);

  setRemaining(newRemaining);


    if (newRemaining > 0) {
      stopId.current = requestAnimationFrame(stepTimer); // Continue the timer
    } else {
      handleTimerEnd();
    }
  };

  function pauseTimer() {
    cancelAnimationFrame(stopId.current);
    stopId.current = null;
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

  function handleTimerEnd() {
    audio.play();
    
    showNotification("Timer Complete!", {
      body: "Good job 🎉",
    });

    cancelAnimationFrame(stopId.current);
    stopId.current = null;
    setRemaining(0);

      if (isPomodoro.current) {
        isPomodoro.current = false;
        isLongBreak.current = false
        isShortBreak.current = true;
        resetTimer();
      }
      else if (isShortBreak.current) {  
        isPomodoro.current = false;
        isLongBreak.current = true;
        isShortBreak.current = false;
        resetTimer();
      }
      else if (isLongBreak.current) {
        isPomodoro.current = true;
        isLongBreak.current = false;
        isShortBreak.current = false;
        resetTimer();
      }
      console.log("Timer completed!")
  }


  function handlePomodroClick() {

    isPomodoro.current = true;
    isShortBreak.current = false;
    isLongBreak.current = false;
    resetTimer();
  }

  function handleShortBreakClick() {
    isPomodoro.current = false;
    isShortBreak.current = true;
    isLongBreak.current = false;
    resetTimer();
  }

  function handleLongBreakClick() {
    isPomodoro.current = false;
    isShortBreak.current = false;
    isLongBreak.current = true;
    resetTimer();
  }

  // useEffect(updateCountdown, [isRunning, isCounting]);
  function resetTimer() {
    let duration = pomodoroTime.current;

    if (isShortBreak.current) {
      duration = shortBreakTime.current;
    }
    else if (isLongBreak.current) {
      duration = longBreakTime.current;

    }
    else {
      duration = pomodoroTime.current;
    }

    if (stopId.current) {
      cancelAnimationFrame(stopId.current);
      stopId.current = null;
    };


    pauseDuration.current = 0;
    startTime.current = null;

    setIsPaused(true);
    setIsRunning(false);
    setDuration(duration);
    setRemaining(duration);
  }
  return (
    <div className="flex flex-col items-center">

      <Mode
        isPomodoro={isPomodoro.current}
        isLongBreak={isLongBreak.current}
        isShortBreak={isShortBreak.current}
        handlePomodroClick={handlePomodroClick}
        handleShortBreakClick={handleShortBreakClick}
        handleLongBreakClick={handleLongBreakClick} />


      {/* timers of different styles in this box */}
      <div id="countdown" className="relative flex h-[50rem] items-center justify-center overflow-clip">

        <CurrentClockFace
          isRunning={isRunning}
          totalTime={duration}
          remaining={remaining}
          refreshRate={refreshRate}
          startupAnimationDuration={startupAnimationDuration}
          animateStartup={animateStartup} />
      </div>

      <TimerControls
        isPaused={isPaused}
        handlePlaybackClick={handlePlaybackClick}
        handleTimerEnd={handleTimerEnd}
      ></TimerControls>



      {/* box ends */}


      <Settings
        pomoMins={pomodoroTime.current / 60000}
        sBreakMins={shortBreakTime.current / 60000}
        lBreakMins={longBreakTime.current / 60000}
        selectedFace={selectedFace}

        visibility={settingsVisibility}
        setVisibility={setSettingsVisibility}
        setSelectedFace={setSelectedFace}
        updateTimes={(pomoTime, sBreak, lBreak) => {

          pomodoroTime.current = pomoTime;
          shortBreakTime.current = sBreak;
          longBreakTime.current = lBreak;
          resetTimer();
        }}
      />



    </div>
  );
}


export default App;


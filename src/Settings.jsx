import { useEffect, useRef, useState } from "react";

function Settings(props) {


  const [userPomodoro, setUserPomodoro] = useState(props.pomoMins);
  const [userSBreakTime, setSBreakTime] = useState(props.sBreakMins);
  const [userLBreakTime, setLBreakTime] = useState(props.lBreakMins);


  const handleSubmit = (event) => {
    event.preventDefault();

    const pomoTime = parseFloat(userPomodoro); // Ensure numeric value
    const sBreakTime = parseFloat(userSBreakTime);
    const lBreakTime = parseFloat(userLBreakTime);

    if (!isNaN(pomoTime) && pomoTime > 0
      && !isNaN(sBreakTime) && sBreakTime > 0
      && !isNaN(lBreakTime) && lBreakTime > 0
    ) {
      props.updateTimes(pomoTime * 60000, sBreakTime * 60000, lBreakTime * 60000);
      props.setVisibility(false);
    } else {
      alert("Please enter a valid number for the time.");
    }

    props.setSelectedFace(document.getElementById("timerFaceDropdown").value);

  };


  return (
    <div>
      {props.visibility && (
        <div className="bg-neutral-800/50 w-screen h-screen absolute top-0 left-0">


          <form onSubmit={handleSubmit}
            className="bg-neutral-600 text-neutral-300 flex items-center flex-col
            font-semibold
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-1/2 min-h-96 max-w-96
        rounded-lg shadow-xl"
          >


            {/* cross icon */}
            <div className="w-full relative">
              <h1 className="text-2xl my-6 mx-6 text-center">Settings</h1>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                className="size-7 mx-4 absolute right-0 top-1/2 -translate-y-1/2
                  stroke-white hover:bg-neutral-400 hover:stroke-neutral-600 rounded-full hover:scale-110 transition-transform"
                onClick={() => props.setVisibility(false)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />

              </svg>
            </div>


            <div>
              {/* form fields */}
              <div className="w-full flex mt-6 flex-col font-semibold">

                <label htmlFor="Faces">Choose a face:</label>
                <select className="bg-neutral-200 px-2 text-neutral-600 rounded-md h-10"
                  name="Faces" id="timerFaceDropdown" defaultValue={props.selectedFace} required>
                  <option label="pie" value="pie"></option>
                  <option label="ring" value="ring"></option>
                  <option label="segmented" value="segmented"></option>
                  <option label="analog" value="analog"></option>
                  <option label="simple" value="simple"></option>
                </select>
              </div>


              <div className="w-full pomodoroIP mt-6 font-semibold">
                <h2 className="">Pomodoro</h2>
                <input
                  value={userPomodoro}
                  className="bg-neutral-500 rounded px-2 text-neutral-300 placeholder-neutral-400"
                  type="text"
                  name=""
                  id=""
                  inputMode="numeric"
                  pattern="\d+(\.\d+)?"
                  placeholder="minutes"
                  onChange={(evnt) => {
                    setUserPomodoro(evnt.target.value);
                  }}
                />
              </div>

              <div className="w-full ShortBreakIP mt-6 font-semibold">
                <h2 className="">Short Break</h2>
                <input
                  value={userSBreakTime}
                  className="bg-neutral-500 rounded px-2 text-neutral-300 placeholder-neutral-400"

                  type="text"
                  name=""
                  id=""
                  inputMode="numeric"
                  pattern="\d+(\.\d+)?"
                  placeholder="minutes"
                  onChange={(evnt) => {
                    setSBreakTime(evnt.target.value);
                  }}
                />
              </div>


              {/* settings icon */}
              <div className="w-full LongBreakIP mt-6 font-semibold">
                <h2 className="">Long Break</h2>
                <input
                  value={userLBreakTime}
                  className="bg-neutral-500 rounded px-2 text-neutral-300 placeholder-neutral-400"
                  type="text"
                  name=""
                  id=""
                  inputMode="numeric"
                  pattern="\d+(\.\d+)?"
                  placeholder="minutes"
                  onChange={(evnt) => {
                    setLBreakTime(evnt.target.value);
                  }}
                />
              </div>

            </div>

            <input
              value={"OK"}
              type="submit"
              className="bg-neutral-300 px-6 py-2 rounded-lg text-neutral-600  m-6
               hover:bg-amber-300 hover:text-neutral-600 "
            />

          </form>
        </div>
      )}


      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="white"
        className="size-14 m-6 p-2 top-0 right-0 absolute rounded-full hover:cursor-pointer hover:bg-neutral-500 hover:scale-105 active:rotate-45 transition-transform"
        onClick={() => {
          props.setVisibility(!props.visibility);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </div>
  );
}

export default Settings;

import { useEffect, useRef, useState } from "react";

function Settings({ setPomodoroMins }) {
  const [userPomodoroMins, setMins] = useState("");
  const [visibility, setVisibility] = useState(false);

  const handleSubmit = (event) => {
    
    event.preventDefault();
    setPomodoroMins(userPomodoroMins);
    setVisibility(false);
  };

  return (
    <div>
      {visibility && (
        <div
          className="bg-purple-950/50 w-screen h-screen absolute top-0 left-0"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white  flex items-center justify-center flex-col
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-1/2 min-h-96 max-w-96
        rounded-lg shadow-xl"
          >
            <h1 className="text-black text-2xl">Settings</h1>

            <div className="pomodoroIP mt-6 font-semibold text-gray-600">
              <h2 className="">Pomodoro</h2>
              <input
                value={userPomodoroMins}
                className="bg-gray-200 rounded px-2"
                type="text"
                name=""
                id=""
                inputMode="numeric"
                pattern="\d+(\.\d+)?"
                placeholder="00 (minutes)"
                onChange={(evnt) => {
                  setMins(evnt.target.value);
                }}
              />
            </div>

            <input
            value={"Ok"}
              type="submit"
              className="bg-purple-400 px-6 py-2 rounded-lg  font-semibold text-white m-6"
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
        className="w-10 h-10 m-6 top-0 right-0 absolute hover:cursor-pointer"
        onClick={() => {
          setVisibility(!visibility);
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

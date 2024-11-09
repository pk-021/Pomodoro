import { useState } from "react";

function Settings({ setPomodoroMins }) {
    const [userPomodoroMins, setMins] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setPomodoroMins(userPomodoroMins);
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white  flex items-center justify-center flex-col w-1/2 rounded-lg min-h-60 max-w-96 mt-20 mb-60" >

                <h1 className="text-black text-2xl">Settings</h1>

                <div className="pomodoroIP mt-6 font-semibold text-gray-600">
                    <h2 className="">Pomodoro</h2>
                    <input value={userPomodoroMins} className="bg-gray-200 rounded px-2" type="text" name="" id=""
                        inputMode="numeric" pattern="^\d+$" placeholder="00 (minutes)" onChange={(evnt) => { setMins(evnt.target.value) }} />
                </div>

                <input type="submit" className="bg-fuchsia-900 px-6 py-2 rounded-lg  font-semibold text-white m-6" />
            </form>
        </>
    )
}


export default Settings;
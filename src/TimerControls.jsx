function TimerControls(props) {

    return (
        <div className="userControls flex relative h-fit justify-center items-center select-none">

            <svg className={`size-28 p-6 ${props.isPaused?"bg-neutral-800 bg-opacity-40":""} hover:bg-neutral-600 rounded-full active:bg-neutral-500"`} viewBox="0 0 24 24" fill="#a3a3a3" xmlns="http://www.w3.org/2000/svg"
                onClick={props.handlePlaybackClick}>
                {props.isPaused ? (
                    <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#ffff " />
                ) : (
                    <>
                        <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10
                        20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"/>
                        <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142
                        21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"/>
                    </>
                )
                }


            </svg>
            <div className={`size-24 absolute left-full translate-x-6 rounded-full p-4 transition-opacity
            hover:bg-neutral-600 active:bg-neutral-500 ${props.isPaused ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onClick={props.handleTimerEnd} >
                < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="stroke-neutral-400" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125
                    0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                </svg >
            </div>
        </div>
    )
}

export default TimerControls;
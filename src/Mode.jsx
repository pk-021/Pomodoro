function Mode(props) {
    return (
        <div className="flex my-6">
            <div className={`modeButton ${props.isPomodoro ? "modeButtonActive" : ""}`} onClick={props.handlePomodroClick}>Pomodoro</div>
            <div className={`modeButton ${props.isShortBreak ? "modeButtonActive" : ""}`} onClick={props.handleShortBreakClick}>Short Break</div>
            <div className={`modeButton ${props.isLongBreak ? "modeButtonActive" : ""}`} onClick={props.handleLongBreakClick}>Long Break</div>
        </div>
    )
}


export default Mode;
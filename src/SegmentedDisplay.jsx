function SegmentedDisplay(props){
    const minutes = Math.floor(props.remaining / (60 * 1000)).toString().padStart(2,"0");
    const seconds = Math.ceil((props.remaining / 1000) % 60).toString().padStart(2,"0");

    return(
        <div className="text-6xl  text-red-500 p-20 bg-neutral-900  shadow-sm rounded-xl">
            <div className="text-9xl font-sevenSegment text-glow tracking-wider tabular-nums">{minutes}:{seconds}</div>
        </div>
    )
}

export default SegmentedDisplay;
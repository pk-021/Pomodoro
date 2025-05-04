function CountdownCircle({ totalTime, remaining }) {
    const startAngle = -90; // SVG arc starts at the top
    const elapsed = totalTime - remaining;
    const iangle = (elapsed / totalTime) * 360;

    const r = 100 ;
    const cx = 100;
    const cy = 100;

    const minutes = Math.floor(remaining / (60 * 1000));
    const seconds = Math.ceil((remaining / 1000) % 60)
        .toString()
        .padStart(2, '0');

    const complementAngle = 360 - iangle;

    function polarToCartesian(cx, cy, r, angleInDegrees) {
        const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
        return {
            x: cx + r * Math.cos(angleInRadians),
            y: cy + r * Math.sin(angleInRadians),
        };
    }

    const complementStart = polarToCartesian(cx, cy, r, startAngle + iangle);
    const complementEnd = polarToCartesian(cx, cy, r, startAngle);

    const largeArcFlag = complementAngle > 180 ? 1 : 0;

    const pathData = [
        `M ${cx} ${cy}`,
        `L ${complementStart.x} ${complementStart.y}`,
        `A ${r} ${r} 0 ${largeArcFlag} 1 ${complementEnd.x} ${complementEnd.y}`,
        'Z'
    ].join(' ');

    return (
        <div className="flex flex-col items-center">
            <svg className="size-[40rem]" viewBox="0 0 200 200">
                <circle cx={cx} cy={cy} r={r} fill="#525252" />
                <path d={pathData} fill="#d4d4d4" />
            </svg>
            <div className="text-white text-6xl font-bold mt-10">
                {minutes}:{seconds}
            </div>
        </div>
    );
}

export default CountdownCircle;

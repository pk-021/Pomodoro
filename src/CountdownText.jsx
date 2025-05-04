
function CountdownText(props) {
  let minutes =Math.floor(props.time / (60*1000));
  let seconds = Math.ceil((props.time / 1000) % 60);
  return (
    <>
      <h1 className="text-white font-sourGummy text-[150px]
        absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
      
    </>
  );

}

export default CountdownText;
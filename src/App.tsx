import React from 'react';
import './App.css';

const size = 1200;
const points = [
  {x: 0, y: size},
  {x: size / 2, y: 0},
  {x: size, y: size},
]
function getMiddleVal (a: number, b: number): number {
  return Math.round((b - a) / 2 + a);
}

async function drawPoint(pointer: {x: number; y: number;}, ctx: CanvasRenderingContext2D, width: number ): Promise<void> {
  ctx.fillStyle = 'black';
  ctx.fillRect(pointer.x - 1, pointer.y - 1, 3, 3);

  const randomPoint = points[Math.floor(Math.random() * points.length)];
  const nextPoint = {x: getMiddleVal(pointer.x, randomPoint.x), y: getMiddleVal(pointer.y, randomPoint.y)};

  setTimeout(() => drawPoint(nextPoint, ctx, width), 0.1);
}

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const appRef = React.useRef<HTMLDivElement | null>(null);

  const [canvasStyle, setCanvasStyle] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (canvasRef.current == null) return;
    if (appRef.current == null) return;

    const ctx = canvasRef.current.getContext('2d');
    if (ctx == null) throw new Error(':(');

    setCanvasStyle({
      height: appRef.current.clientHeight - 32,
      marginTop: 16,
      width: appRef.current.clientHeight - 32,
      marginLeft: (appRef.current.clientWidth - appRef.current.clientHeight + 32) / 2,
    })

    drawPoint({x: 0, y: size}, ctx, canvasRef.current.width);

  }, [canvasRef, appRef])

  return (
    <div className="App" ref={appRef}>
      <canvas ref={canvasRef} width={size} height={size} style={canvasStyle}/>
    </div>
  );
}

export default App;

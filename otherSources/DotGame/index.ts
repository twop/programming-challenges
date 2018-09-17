window.onload = () => {
  const playAreaEl = document.getElementById("playground") as HTMLDivElement;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const slider = document.getElementById("speedSlider") as HTMLInputElement;
  const speedVal = document.getElementById("speedVal") as HTMLSpanElement;
  const scoreVal = document.getElementById("scoreVal") as HTMLSpanElement;
  const resetBtn = document.getElementById("resetBtn") as HTMLSpanElement;

  slider.min = SpeedRange[0].toString();
  slider.max = SpeedRange[1].toString();

  const {
    height: cHeight,
    width: cWidth,
    left: cLeft,
    top: cTop
  } = playAreaEl.getBoundingClientRect();

  canvas.width = cWidth;
  canvas.height = cHeight;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  let state = addBubble(initState(cWidth, cHeight));

  const setSpeedValAndLabel = (val: number) => {
    slider.value = val.toString();
    speedVal.textContent = val.toString();
  };

  resetBtn.onclick = () => {
    state = initState(cWidth, cHeight, state.session + 1);
    scoreVal.textContent = "0";
    setSpeedValAndLabel(state.speed);
    drawBubbles(state, ctx);
  };

  slider.oninput = () => {
    const newSpeed = parseInt(slider.value);
    setSpeedValAndLabel(newSpeed);
    state = { ...state, speed: newSpeed };
  };

  setSpeedValAndLabel(state.speed);

  drawBubbles(state, ctx);

  const respawnTimeout = 1000;
  const refreshRate = 30;

  setInterval(() => {
    state = moveBubbles(state, refreshRate);
    drawBubbles(state, ctx);
  }, refreshRate);

  const insertAndDraw = (forSession: number | undefined) => {
    if (forSession !== undefined && state.session !== forSession) {
      return; // means we pressed "Again?" but have bubbles to respawn
    }

    state = addBubble(state);
    drawBubbles(state, ctx);
  };

  setInterval(insertAndDraw, respawnTimeout);

  canvas.addEventListener("mousedown", e => {
    const x = e.clientX - cLeft;
    const y = e.clientY - cTop;

    const newState = tryHit(state, x, y);

    if (newState !== state) {
      state = newState;
      scoreVal.textContent = newState.score.toString();
      drawBubbles(state, ctx);

      setTimeout(insertAndDraw, respawnTimeout, state.session);
    }
  });
};

type Bubble = {
  rad: number;
  x: number;
  y: number;
};

type State = {
  width: number;
  height: number;
  bubbles: Bubble[];
  speed: number;
  score: number;
  session: number;
};

const SpeedRange = [10, 100];
const RadRange = [5, 50];
const ScoreRange = [10, 1];

const initState = (
  width: number,
  height: number,
  session: number = 0
): State => ({
  bubbles: [],
  width,
  height,
  speed: 55,
  score: 0,
  session
});

const generateRad = (): number => {
  const [min, max] = RadRange;
  return Math.round(min + Math.random() * (max - min));
};

const addBubble = (prev: State): State => {
  const { width, bubbles } = prev;
  const rad = generateRad();

  const bubble: Bubble = {
    x: Math.round(rad + Math.random() * (width - 2 * rad)),
    y: 0,
    rad
  };

  return { ...prev, bubbles: bubbles.concat(bubble) };
};

const moveBubbles = (prev: State, ms: number): State => {
  const { bubbles, speed, height } = prev;

  // TODO: immutable. If slow replace with forEach mutable version
  return {
    ...prev,
    bubbles: bubbles
      .map(b => ({ ...b, y: b.y + (speed * ms) / 1000 }))
      .filter(({ y, rad }) => y + rad <= height)
  };
};

const hitTest = (x: number, y: number) => (b: Bubble): boolean =>
  (b.x - x) ** 2 + (b.y - y) ** 2 <= b.rad ** 2;

const calcScore = ({ rad }: Bubble): number => {
  const [smallS, bigS] = ScoreRange;
  const [small, big] = RadRange;

  return Math.round(smallS + ((rad - small) / (big - small)) * (bigS - smallS));
};

const tryHit = (prev: State, x: number, y: number): State => {
  const { bubbles } = prev;
  const hit = bubbles.filter(hitTest(x, y));

  if (hit.length <= 0) return prev;

  const score = hit.reduce((s, b) => s + calcScore(b), 0);

  const set = new Set(hit);

  return {
    ...prev,
    score: prev.score + score,
    bubbles: bubbles.filter(b => !set.has(b))
  };
};

const drawBubbles = (state: State, ctx: CanvasRenderingContext2D) => {
  const { bubbles, width, height } = state;

  ctx.clearRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowColor = "aquamarine";

  bubbles.forEach(({ x, y, rad }) => {
    ctx.beginPath();
    ctx.ellipse(x, y, rad, rad, 0, 0, 2 * Math.PI);
    ctx.stroke();
  });
};

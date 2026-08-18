const DOTS = [
  { d: "M560 201 L190.1 -12", dur: "8.9s", delay: "1.1s" },
  { d: "M560 201 L928.4 -12", dur: "10.7s", delay: "1.22s" },
  { d: "M560 201 L-12 201", dur: "12.9s", delay: "1.34s" },
  { d: "M560 201 L560 414", dur: "15.1s", delay: "1.46s" },
] as const;

function Tick({ x, y, vertical }: { x: number; y: number; vertical: boolean }) {
  const lines = [0, 4, 8, 12];
  return (
    <g data-part="measurement-mark">
      <rect
        width={vertical ? 12 : 4}
        height={vertical ? 4 : 12}
        transform={`translate(${x} ${y})`}
        fill="var(--x-canvas)"
      />
      {lines.map((n) =>
        vertical ? (
          <line
            key={n}
            x1={x + n}
            y1={y}
            x2={x + n}
            y2={y + 4}
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <line
            key={n}
            x1={x}
            y1={y + n}
            x2={x + 4}
            y2={y + n}
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ),
      )}
    </g>
  );
}

export function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <svg
        viewBox="0 0 1120 402"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
      >
        <g pointerEvents="none">
          <path
            d="M1051.84 485.251L67.1669 -83.2491"
            stroke="currentColor"
            strokeDasharray="5 5"
          />
          <path
            d="M1051.83 -83.25L67.1618 485.25"
            stroke="currentColor"
            strokeDasharray="5 5"
          />
          <path
            d="M1128 201L-9.0001 201"
            stroke="currentColor"
            strokeDasharray="5 5"
          />
          <path
            d="M560 421L560 -19"
            stroke="currentColor"
            strokeDasharray="5 5"
          />
          <circle
            cx="560"
            cy="201"
            r="170"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="5 5"
            className="ring-outer"
          />
          <circle
            cx="560"
            cy="201"
            r="110"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            className="ring-inner"
          />
          <circle
            cx="560"
            cy="201"
            r="48"
            fill="var(--x-canvas)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="560"
            cy="201"
            r="9"
            fill="var(--x-canvas)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="core" cx="560" cy="201" r="2" fill="currentColor" />
          <Tick x={558} y={109} vertical={false} />
          <Tick x={558} y={281} vertical={false} />
          <Tick x={430} y={199} vertical={true} />
          <Tick x={674} y={199} vertical={true} />
          {DOTS.map((dot) => (
            <circle
              key={dot.d}
              cx="0"
              cy="0"
              r="3"
              fill="var(--x-canvas)"
              stroke="currentColor"
              className="hero-pipeline-dot"
              style={{
                offsetPath: `path("${dot.d}")`,
                animationName: "hero-pipeline-dot-outward",
                animationDuration: dot.dur,
                animationDelay: dot.delay,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
              }}
            />
          ))}
        </g>
      </svg>
      <span className="hero-chip" style={{ left: "7%", top: "18%" }}>
        LayerZero
      </span>
      <span className="hero-chip" style={{ right: "8%", top: "20%" }}>
        Mantle
      </span>
      <span className="hero-chip" style={{ left: "38%", bottom: "18%" }}>
        Sozu Haus
      </span>
      <span className="hero-chip" style={{ left: "12%", bottom: "30%" }}>
        Canada
      </span>
    </div>
  );
}

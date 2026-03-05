export const DashedCircle = ({ 
  className = "", 
  color,
  speed = "10s",
  style = {}
}: {
  className?: string;
  color?: string;
  speed?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className={`relative ${className}`} style={style}>
      <svg className="w-full h-full rotate-animation" style={{ animationDuration: speed } as any}>
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke={color || "var(--circle-color)"}
          strokeWidth="1.5"
          strokeDasharray="10, 15"
          strokeLinecap="round"
          className="marching-circle"
        />
      </svg>
    </div>
  );
};
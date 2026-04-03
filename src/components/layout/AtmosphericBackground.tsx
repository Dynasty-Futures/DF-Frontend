const AtmosphericBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient gold glow at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(43 74% 49% / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Tendril 1 — warm gold, flows left-to-right across upper area */}
      <div className="smoke-tendril smoke-tendril-1" />

      {/* Tendril 2 — cool blue-gray, flows right-to-left across middle */}
      <div className="smoke-tendril smoke-tendril-2" />

      {/* Tendril 3 — warm gold, flows left-to-right across lower area */}
      <div className="smoke-tendril smoke-tendril-3" />

      {/* Tendril 4 — cool wisp, flows right-to-left upper area */}
      <div className="smoke-tendril smoke-tendril-4" />

      <style>{`
        .smoke-tendril {
          position: absolute;
          border-radius: 40% 60% 55% 45% / 50% 40% 60% 50%;
          opacity: 0.14;
        }

        .smoke-tendril-1 {
          width: 600px;
          height: 80px;
          top: 20%;
          background: linear-gradient(90deg, transparent 0%, hsl(43 65% 50% / 0.7) 30%, hsl(43 65% 50% / 0.9) 50%, hsl(43 65% 50% / 0.7) 70%, transparent 100%);
          animation: flowRight1 22s linear infinite;
        }

        .smoke-tendril-2 {
          width: 550px;
          height: 70px;
          top: 50%;
          background: linear-gradient(90deg, transparent 0%, hsl(220 15% 50% / 0.7) 30%, hsl(220 15% 50% / 0.9) 50%, hsl(220 15% 50% / 0.7) 70%, transparent 100%);
          animation: flowLeft1 26s linear infinite;
          animation-delay: -8s;
        }

        .smoke-tendril-3 {
          width: 650px;
          height: 75px;
          bottom: 22%;
          background: linear-gradient(90deg, transparent 0%, hsl(35 55% 48% / 0.7) 30%, hsl(35 55% 48% / 0.9) 50%, hsl(35 55% 48% / 0.7) 70%, transparent 100%);
          animation: flowRight2 28s linear infinite;
          animation-delay: -12s;
        }

        .smoke-tendril-4 {
          width: 500px;
          height: 65px;
          top: 12%;
          background: linear-gradient(90deg, transparent 0%, hsl(220 12% 45% / 0.7) 30%, hsl(220 12% 45% / 0.9) 50%, hsl(220 12% 45% / 0.7) 70%, transparent 100%);
          animation: flowLeft2 24s linear infinite;
          animation-delay: -4s;
        }

        @keyframes flowRight1 {
          0% {
            left: -600px;
            transform: translateY(0) rotate(-3deg) scaleY(1);
          }
          25% {
            transform: translateY(-30px) rotate(2deg) scaleY(1.3);
          }
          50% {
            transform: translateY(15px) rotate(-2deg) scaleY(0.8);
          }
          75% {
            transform: translateY(-20px) rotate(3deg) scaleY(1.2);
          }
          100% {
            left: 110vw;
            transform: translateY(0) rotate(-3deg) scaleY(1);
          }
        }

        @keyframes flowLeft1 {
          0% {
            right: -550px;
            left: auto;
            transform: translateY(0) rotate(3deg) scaleY(1);
          }
          25% {
            transform: translateY(25px) rotate(-2deg) scaleY(1.2);
          }
          50% {
            transform: translateY(-20px) rotate(2deg) scaleY(0.85);
          }
          75% {
            transform: translateY(15px) rotate(-3deg) scaleY(1.15);
          }
          100% {
            right: 110vw;
            left: auto;
            transform: translateY(0) rotate(3deg) scaleY(1);
          }
        }

        @keyframes flowRight2 {
          0% {
            left: -650px;
            transform: translateY(0) rotate(2deg) scaleY(1);
          }
          20% {
            transform: translateY(-25px) rotate(-3deg) scaleY(1.25);
          }
          40% {
            transform: translateY(20px) rotate(2deg) scaleY(0.9);
          }
          60% {
            transform: translateY(-15px) rotate(-2deg) scaleY(1.15);
          }
          80% {
            transform: translateY(10px) rotate(3deg) scaleY(0.95);
          }
          100% {
            left: 110vw;
            transform: translateY(0) rotate(2deg) scaleY(1);
          }
        }

        @keyframes flowLeft2 {
          0% {
            right: -500px;
            left: auto;
            transform: translateY(0) rotate(-2deg) scaleY(1);
          }
          30% {
            transform: translateY(20px) rotate(3deg) scaleY(1.3);
          }
          60% {
            transform: translateY(-25px) rotate(-2deg) scaleY(0.85);
          }
          100% {
            right: 110vw;
            left: auto;
            transform: translateY(0) rotate(-2deg) scaleY(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smoke-tendril {
            animation: none !important;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AtmosphericBackground;

const AtmosphericBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 15%, hsl(43 74% 49% / 0.08) 0%, transparent 72%)",
        }}
      />

      <svg
        className="smoke-canvas"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldSmokeCore" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="hsl(42 86% 70% / 0)" />
            <stop offset="18%" stopColor="hsl(42 86% 70% / 0.2)" />
            <stop offset="38%" stopColor="hsl(45 92% 80% / 0.62)" />
            <stop offset="54%" stopColor="hsl(43 88% 74% / 0.86)" />
            <stop offset="68%" stopColor="hsl(40 76% 60% / 0.45)" />
            <stop offset="84%" stopColor="hsl(38 66% 52% / 0.22)" />
            <stop offset="100%" stopColor="hsl(42 86% 70% / 0)" />
          </linearGradient>

          <linearGradient id="goldSmokeEdge" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="hsl(45 96% 86% / 0)" />
            <stop offset="30%" stopColor="hsl(45 96% 86% / 0.24)" />
            <stop offset="50%" stopColor="hsl(46 98% 92% / 0.42)" />
            <stop offset="70%" stopColor="hsl(45 96% 86% / 0.2)" />
            <stop offset="100%" stopColor="hsl(45 96% 86% / 0)" />
          </linearGradient>

          <filter id="smokeRibbon" x="-25%" y="-220%" width="150%" height="540%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.007 0.03"
              numOctaves="2"
              seed="11"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.007 0.03;0.010 0.022;0.007 0.03"
                dur="26s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
              result="warp"
            />
            <feGaussianBlur in="warp" stdDeviation="1.7" />
          </filter>
        </defs>

        <g className="smoke-band smoke-band-a">
          <path
            d="M -140 590 C 120 470, 300 760, 520 600 C 700 470, 860 470, 1040 600 C 1240 750, 1420 500, 1700 610"
            stroke="url(#goldSmokeCore)"
            strokeWidth="36"
            strokeLinecap="round"
            fill="none"
            opacity="0.36"
            filter="url(#smokeRibbon)"
          />
          <path
            d="M -150 580 C 110 470, 280 742, 500 598 C 690 478, 860 470, 1038 590 C 1236 726, 1418 510, 1700 605"
            stroke="url(#goldSmokeEdge)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
            filter="url(#smokeRibbon)"
          />
          <path
            d="M -130 606 C 130 492, 320 772, 528 612 C 704 494, 868 492, 1036 610 C 1222 748, 1390 528, 1680 620"
            stroke="url(#goldSmokeEdge)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            opacity="0.42"
            filter="url(#smokeRibbon)"
          />
        </g>

        <g className="smoke-band smoke-band-b">
          <path
            d="M -180 520 C 80 450, 250 690, 450 560 C 640 450, 850 450, 1050 565 C 1230 670, 1430 500, 1740 580"
            stroke="url(#goldSmokeCore)"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
            opacity="0.34"
            filter="url(#smokeRibbon)"
          />
          <path
            d="M -172 516 C 92 444, 264 674, 458 556 C 644 454, 850 454, 1048 560 C 1230 666, 1432 508, 1740 576"
            stroke="url(#goldSmokeEdge)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.38"
            filter="url(#smokeRibbon)"
          />
        </g>

        <g className="smoke-band smoke-band-c">
          <path
            d="M -140 420 C 40 340, 240 560, 420 460 C 560 380, 760 380, 910 470 C 1100 590, 1320 420, 1690 510"
            stroke="url(#goldSmokeCore)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
            filter="url(#smokeRibbon)"
          />
          <path
            d="M -132 418 C 52 344, 242 548, 426 458 C 574 382, 762 384, 914 464 C 1092 582, 1326 426, 1690 506"
            stroke="url(#goldSmokeEdge)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.34"
            filter="url(#smokeRibbon)"
          />
        </g>

        <g className="smoke-band smoke-band-d">
          <path
            d="M -170 700 C 10 620, 220 820, 390 742 C 570 660, 730 652, 930 740 C 1120 824, 1290 700, 1710 760"
            stroke="url(#goldSmokeCore)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
            opacity="0.28"
            filter="url(#smokeRibbon)"
          />
          <path
            d="M -166 696 C 8 622, 230 812, 398 738 C 576 662, 736 658, 936 736 C 1128 816, 1294 706, 1710 756"
            stroke="url(#goldSmokeEdge)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
            filter="url(#smokeRibbon)"
          />
        </g>

        <g className="smoke-band smoke-band-e">
          <path
            d="M -160 300 C 50 250, 240 430, 410 360 C 590 282, 770 286, 940 360 C 1090 426, 1310 320, 1710 390"
            stroke="url(#goldSmokeCore)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            opacity="0.22"
            filter="url(#smokeRibbon)"
          />
          <path
            d="M -152 298 C 62 254, 248 422, 418 356 C 596 286, 774 290, 946 356 C 1096 422, 1318 326, 1710 386"
            stroke="url(#goldSmokeEdge)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.28"
            filter="url(#smokeRibbon)"
          />
        </g>
      </svg>

      <style>{`
        .smoke-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .smoke-band {
          transform-origin: center;
        }

        .smoke-band-a {
          animation: smokeDriftA 34s linear infinite;
        }

        .smoke-band-b {
          animation: smokeDriftB 42s linear infinite reverse;
          animation-delay: -9s;
        }

        .smoke-band-c {
          animation: smokeDriftC 29s linear infinite;
          animation-delay: -14s;
        }

        .smoke-band-d {
          animation: smokeDriftD 38s linear infinite reverse;
          animation-delay: -5s;
        }

        .smoke-band-e {
          animation: smokeDriftE 47s linear infinite;
          animation-delay: -20s;
        }

        @keyframes smokeDriftA {
          0% {
            transform: translate3d(-3%, 1.2%, 0) scale(0.86, 0.84) rotate(-2.2deg);
          }
          25% {
            transform: translate3d(2%, -1.1%, 0) scale(0.9, 0.9) rotate(0.8deg);
          }
          50% {
            transform: translate3d(5%, 0.3%, 0) scale(0.88, 0.83) rotate(2.1deg);
          }
          75% {
            transform: translate3d(1.1%, -1.6%, 0) scale(0.91, 0.88) rotate(-0.2deg);
          }
          100% {
            transform: translate3d(-3%, 1.2%, 0) scale(0.86, 0.84) rotate(-2.2deg);
          }
        }

        @keyframes smokeDriftB {
          0% {
            transform: translate3d(2.5%, -6.8%, 0) scale(0.76, 0.72) rotate(1.6deg);
          }
          25% {
            transform: translate3d(-0.8%, -5.6%, 0) scale(0.8, 0.77) rotate(-0.8deg);
          }
          50% {
            transform: translate3d(-3.2%, -7.4%, 0) scale(0.75, 0.7) rotate(-2deg);
          }
          75% {
            transform: translate3d(0.3%, -5.2%, 0) scale(0.79, 0.75) rotate(0.6deg);
          }
          100% {
            transform: translate3d(2.5%, -6.8%, 0) scale(0.76, 0.72) rotate(1.6deg);
          }
        }

        @keyframes smokeDriftC {
          0% {
            transform: translate3d(-5.5%, -15.8%, 0) scale(0.68, 0.64) rotate(-2.5deg);
          }
          30% {
            transform: translate3d(-1.8%, -14.3%, 0) scale(0.72, 0.7) rotate(1.2deg);
          }
          60% {
            transform: translate3d(1.6%, -16.4%, 0) scale(0.69, 0.66) rotate(2.5deg);
          }
          100% {
            transform: translate3d(-5.5%, -15.8%, 0) scale(0.68, 0.64) rotate(-2.5deg);
          }
        }

        @keyframes smokeDriftD {
          0% {
            transform: translate3d(-4.2%, 12.8%, 0) scale(0.74, 0.72) rotate(1.8deg);
          }
          30% {
            transform: translate3d(0.2%, 11.1%, 0) scale(0.79, 0.76) rotate(-0.6deg);
          }
          55% {
            transform: translate3d(3.7%, 13.9%, 0) scale(0.73, 0.7) rotate(-2.4deg);
          }
          100% {
            transform: translate3d(-4.2%, 12.8%, 0) scale(0.74, 0.72) rotate(1.8deg);
          }
        }

        @keyframes smokeDriftE {
          0% {
            transform: translate3d(3%, -25.5%, 0) scale(0.58, 0.56) rotate(-1.2deg);
          }
          30% {
            transform: translate3d(-0.2%, -23.4%, 0) scale(0.62, 0.6) rotate(1.3deg);
          }
          65% {
            transform: translate3d(-4.1%, -26.6%, 0) scale(0.57, 0.54) rotate(2.4deg);
          }
          100% {
            transform: translate3d(3%, -25.5%, 0) scale(0.58, 0.56) rotate(-1.2deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smoke-band,
          .smoke-band-a,
          .smoke-band-b,
          .smoke-band-c,
          .smoke-band-d,
          .smoke-band-e {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AtmosphericBackground;

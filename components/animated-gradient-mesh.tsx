'use client'

export function AnimatedGradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* SVG gradient mesh with animation */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 1200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Define gradients */}
          <radialGradient id="grad1" cx="25%" cy="25%">
            <stop offset="0%" stopColor="oklch(0.70 0.22 250)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.13 0.02 260)" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="grad2" cx="75%" cy="75%">
            <stop offset="0%" stopColor="oklch(0.25 0.03 260)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.13 0.02 260)" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="grad3" cx="50%" cy="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.24 250)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="oklch(0.13 0.02 260)" stopOpacity="0" />
          </radialGradient>

          {/* Animation filters */}
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>

        {/* Animated gradient orbs */}
        <g className="animate-gradient-mesh-1">
          <circle
            cx="200"
            cy="300"
            r="400"
            fill="url(#grad1)"
            filter="url(#blur)"
          />
        </g>

        <g className="animate-gradient-mesh-2">
          <circle
            cx="1000"
            cy="800"
            r="350"
            fill="url(#grad2)"
            filter="url(#blur)"
          />
        </g>

        <g className="animate-gradient-mesh-3">
          <circle
            cx="600"
            cy="600"
            r="300"
            fill="url(#grad3)"
            filter="url(#blur)"
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes mesh-float-1 {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          25% {
            transform: translate(30px, -40px);
          }
          50% {
            transform: translate(-20px, 50px);
          }
          75% {
            transform: translate(40px, 20px);
          }
        }

        @keyframes mesh-float-2 {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          25% {
            transform: translate(-40px, 30px);
          }
          50% {
            transform: translate(50px, -20px);
          }
          75% {
            transform: translate(-30px, -40px);
          }
        }

        @keyframes mesh-float-3 {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          25% {
            transform: translate(20px, 40px);
          }
          50% {
            transform: translate(-30px, -30px);
          }
          75% {
            transform: translate(35px, -25px);
          }
        }

        @keyframes mesh-wave {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-gradient-mesh-1 {
          animation: mesh-float-1 8s ease-in-out infinite, mesh-wave 6s ease-in-out infinite;
        }

        .animate-gradient-mesh-2 {
          animation: mesh-float-2 10s ease-in-out infinite, mesh-wave 7s ease-in-out infinite 1s;
        }

        .animate-gradient-mesh-3 {
          animation: mesh-float-3 12s ease-in-out infinite, mesh-wave 8s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  )
}

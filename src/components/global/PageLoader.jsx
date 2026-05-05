import React, { useEffect, useRef } from 'react'

const STATUS_MESSAGES = [
  'INITIALIZING ASSETS',
  'SECURING TRANSACTIONS',
  'SYNCING BLOCKCHAIN',
  'LOADING MARKET',
]

const TICK_COUNT = 32

const PageLoader = ({ visible = true, onFadeOutComplete }) => {
  const overlayRef = useRef(null)
  const msgRef = useRef(null)
  const intervalRef = useRef(null)
  const cycleRef = useRef(0)

  // Cycle status messages
  useEffect(() => {
    if (!visible) return
    intervalRef.current = setInterval(() => {
      cycleRef.current = (cycleRef.current + 1) % STATUS_MESSAGES.length
      if (msgRef.current) {
        msgRef.current.style.opacity = '0'
        setTimeout(() => {
          if (msgRef.current) {
            msgRef.current.textContent = STATUS_MESSAGES[cycleRef.current]
            msgRef.current.style.opacity = '1'
          }
        }, 300)
      }
    }, 2800)
    return () => clearInterval(intervalRef.current)
  }, [visible])

  // Smooth fade-out on hide
  useEffect(() => {
    if (!visible && overlayRef.current) {
      overlayRef.current.classList.add('qw-fade-out')
      const t = setTimeout(() => {
        onFadeOutComplete?.()
      }, 500)
      return () => clearTimeout(t)
    }
  }, [visible, onFadeOutComplete])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Share+Tech+Mono&display=swap');

        /* ── OVERLAY ── */
        .qw-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background:
            radial-gradient(ellipse 55% 45% at 50% 50%,
              rgba(1, 204, 228, 0.05) 0%,
              rgba(0, 8, 12, 0.35) 50%,
              transparent 100%),
            rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          animation: qwFadeIn 0.5s ease both;
          font-family: 'Rajdhani', sans-serif;
        }

        .qw-overlay.qw-fade-out {
          animation: qwFadeOut 0.5s ease forwards;
        }

        /* ── RINGS ── */
        .qw-ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            rgba(1, 204, 228, 0.15) 20%,
            rgba(1, 204, 228, 0.7) 60%,
            rgba(1, 204, 228, 1) 80%,
            transparent 100%
          );
          animation: qwSpinCW 2.4s linear infinite;
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), white calc(100% - 2px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), white calc(100% - 2px));
        }

        .qw-ring-mid {
          position: absolute;
          inset: 20px;
          border-radius: 50%;
          background: conic-gradient(
            from 180deg,
            transparent 0%,
            rgba(1, 204, 228, 0.08) 30%,
            rgba(1, 204, 228, 0.45) 70%,
            transparent 100%
          );
          animation: qwSpinCCW 3.6s linear infinite;
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1px));
        }

        /* ── HALO ── */
        .qw-halo {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(1, 204, 228, 0.12) 0%, transparent 70%);
          animation: qwPulse 2s ease-in-out infinite;
        }

        /* ── ORBITING PARTICLES ── */
        .qw-orbit {
          position: absolute;
          inset: 32px;
          border-radius: 50%;
          animation: qwSpinCW 1.8s linear infinite;
        }
        .qw-orbit::before {
          content: '';
          position: absolute;
          top: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #01CCE4;
          box-shadow: 0 0 8px 3px rgba(1, 204, 228, 0.6);
        }

        .qw-orbit-2 {
          position: absolute;
          inset: 48px;
          border-radius: 50%;
          animation: qwSpinCCW 2.8s linear infinite;
        }
        .qw-orbit-2::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(1, 204, 228, 0.7);
          box-shadow: 0 0 6px 2px rgba(1, 204, 228, 0.4);
        }

        /* ── CORE ── */
        .qw-core {
          position: relative;
          z-index: 2;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 40% 38%,
            rgba(1, 204, 228, 0.25) 0%,
            rgba(0, 40, 50, 0.9) 60%,
            #000e12 100%
          );
          border: 1px solid rgba(1, 204, 228, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: qwCorePulse 2s ease-in-out infinite;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 28px;
          letter-spacing: 0.04em;
          color: rgba(1, 204, 228, 0.9);
          text-shadow: 0 0 8px rgba(1, 204, 228, 0.6);
        }

        /* ── TICK MARKS ── */
        .qw-ticks {
          position: absolute;
          inset: -6px;
          animation: qwSpinCW 12s linear infinite;
        }
        .qw-tick {
          position: absolute;
          width: 1px;
          top: 0;
          left: 50%;
          transform-origin: 50% 96px;
          border-radius: 1px;
          background: rgba(1, 204, 228, 0.35);
        }

        /* ── STATUS TEXT ── */
        .qw-status {
          margin-top: 32px;
          text-align: center;
          animation: qwFadeSlideUp 0.8s 0.3s ease both;
        }
        .qw-status-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.18em;
          color: rgba(1, 204, 228, 0.7);
          text-shadow: 0 0 10px rgba(1, 204, 228, 0.3);
        }
        .qw-msg {
         
          transition: opacity 0.3s ease;
        }
        .qw-dots::after {
          content: '';
          animation: qwDots 1.5s steps(4, end) infinite;
        }
        .qw-brand {
          margin-top: 10px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.35em;
          color: rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
        }

        /* ── CORNER ACCENTS ── */
        .qw-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          opacity: 0.4;
        }
        .qw-corner-tl { top: 24px; left: 24px; border-top: 1px solid #01CCE4; border-left: 1px solid #01CCE4; }
        .qw-corner-tr { top: 24px; right: 24px; border-top: 1px solid #01CCE4; border-right: 1px solid #01CCE4; }
        .qw-corner-bl { bottom: 24px; left: 24px; border-bottom: 1px solid #01CCE4; border-left: 1px solid #01CCE4; }
        .qw-corner-br { bottom: 24px; right: 24px; border-bottom: 1px solid #01CCE4; border-right: 1px solid #01CCE4; }

        /* ── SCAN LINE ── */
        .qw-scan {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(1, 204, 228, 0.12), transparent);
          animation: qwScan 4s linear infinite;
          pointer-events: none;
        }

        /* ── KEYFRAMES ── */
        @keyframes qwFadeIn      { from { opacity: 0 } to { opacity: 1 } }
        @keyframes qwFadeOut     { from { opacity: 1 } to { opacity: 0 } }
        @keyframes qwSpinCW      { to { transform: rotate(360deg) } }
        @keyframes qwSpinCCW     { to { transform: rotate(-360deg) } }
        @keyframes qwPulse       { 0%, 100% { opacity: 0.6; transform: scale(1) } 50% { opacity: 1; transform: scale(1.06) } }
        @keyframes qwCorePulse   {
          0%, 100% { box-shadow: 0 0 16px 4px rgba(1,204,228,0.15), inset 0 0 12px rgba(1,204,228,0.1); }
          50%       { box-shadow: 0 0 24px 8px rgba(1,204,228,0.25), inset 0 0 18px rgba(1,204,228,0.18); }
        }
        @keyframes qwFadeSlideUp { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes qwDots        { 0%{content:''} 25%{content:'.'} 50%{content:'..'} 75%{content:'...'} 100%{content:''} }
        @keyframes qwScan        { 0%{top:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0} }
      `}</style>

      <div ref={overlayRef} className="qw-overlay">

        {/* Corner accents */}
        <div className="qw-corner qw-corner-tl" />
        <div className="qw-corner qw-corner-tr" />
        <div className="qw-corner qw-corner-bl" />
        <div className="qw-corner qw-corner-br" />

        {/* Scan line */}
        <div className="qw-scan" />

        {/* Loader scene */}
        <div style={{
          position: 'relative',
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="qw-halo" />
          <div className="qw-ring-outer" />
          <div className="qw-ring-mid" />

          {/* Tick marks */}
          <div className="qw-ticks">
            {Array.from({ length: TICK_COUNT }).map((_, i) => (
              <div
                key={i}
                className="qw-tick"
                style={{
                  height: i % 4 === 0 ? 8 : 5,
                  opacity: i % 4 === 0 ? 0.7 : 0.25,
                  transform: `rotate(${i * (360 / TICK_COUNT)}deg) translateX(-50%)`,
                }}
              />
            ))}
          </div>

          {/* Orbiting particles */}
          <div className="qw-orbit" />
          <div className="qw-orbit-2" />

          {/* Core */}
          <div className="qw-core">MF</div>
        </div>

        {/* Status text */}
        <div className="qw-status">
          <div className="qw-status-text">
            <span ref={msgRef} className="qw-msg text-xl">{STATUS_MESSAGES[0]}</span>
            <span className="qw-dots" />
          </div>
          <div className="qw-brand">Mayest Finor</div>
        </div>

      </div>
    </>
  )
}

export default PageLoader
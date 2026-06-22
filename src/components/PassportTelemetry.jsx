// Waypoint "passport" overlay — mirrors the CAD telemetry aesthetic of
// TelemetryFrame but re-skinned for the travel/explorer personal mode.
// Ultra-faint, non-interactive, purely decorative.
export default function PassportTelemetry() {
  const markerClass =
    'absolute font-mono text-[9px] tracking-[0.3em] text-neutral-500 opacity-40 uppercase'

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className={`${markerClass} bottom-6 left-6`}>// DEPARTURE: BLR</div>

      <div className={`${markerClass} top-6 left-1/2 -translate-x-1/2`}>
        [ FLIGHT_RADAR : ACTIVE ]
      </div>

      <div
        className={`${markerClass} right-6 top-1/2 -translate-y-1/2`}
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        &gt; WAYPOINT: CDG
      </div>
    </div>
  )
}

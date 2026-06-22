// Static CAD-style schematic markers framing the abstract canvas with
// real-world hardware telemetry. Ultra-faint, non-interactive.
export default function TelemetryFrame() {
  const markerClass =
    'absolute font-mono text-[9px] tracking-[0.2em] text-neutral-500 opacity-20 uppercase'

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className={`${markerClass} bottom-6 left-6`}>
        [ EDGE_NODE_ACTIVE : COLUMBUS_OH ]
      </div>
      <div className={`${markerClass} top-6 left-1/2 -translate-x-1/2`}>
        // EVENT_BUS_ORCHESTRATION : ONLINE
      </div>
      <div
        className={`${markerClass} right-6 top-1/2 -translate-y-1/2`}
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        &gt; KAFKA_STREAM_LATENCY: &lt;12ms
      </div>
    </div>
  )
}

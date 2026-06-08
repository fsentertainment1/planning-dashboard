import { useState, useCallback } from "react";
import type { TrackingResult } from "@/lib/types";

const STATUS_LABELS: Record<string, string> = {
  "pre-transit": "Pre-Transit",
  transit: "In Transit",
  delivered: "Delivered",
  failure: "Delivery Failed",
  unknown: "Unknown",
  UNKNOWN: "Unknown",
  NOT_FOUND: "Not Found",
  NO_API_KEY: "API Key Missing",
};

const STATUS_COLORS: Record<string, string> = {
  delivered: "#16a34a",
  transit: "#2563eb",
  "pre-transit": "#d97706",
  failure: "#dc2626",
  UNKNOWN: "#6b7280",
  NOT_FOUND: "#6b7280",
  NO_API_KEY: "#6b7280",
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("nl-NL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

interface Props {
  defaultTrackingNumber?: string;
}

export default function PackageTracker({ defaultTrackingNumber = "" }: Props) {
  const [input, setInput] = useState(defaultTrackingNumber);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const track = useCallback(async (trackingNumber: string) => {
    const id = trackingNumber.trim();
    if (!id) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/track?trackingNumber=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to fetch tracking info");
      } else {
        setResult(data as TrackingResult);
      }
    } catch {
      setError("Network error — could not reach the server");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track(input);
  };

  const statusColor = result ? (STATUS_COLORS[result.statusCode] ?? STATUS_COLORS[result.status] ?? "#6b7280") : "#6b7280";
  const statusLabel = result ? (STATUS_LABELS[result.statusCode] ?? STATUS_LABELS[result.status] ?? result.status) : "";

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
        <div style={{ background: "#FFCC00", padding: "0.5rem 0.75rem", borderRadius: 6, fontWeight: 800, fontSize: "1.1rem", color: "#d40511", letterSpacing: "-0.5px" }}>
          DHL
        </div>
        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700, color: "#1e293b" }}>
          Package Tracker
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter DHL tracking number"
          style={{
            flex: 1,
            padding: "0.65rem 1rem",
            border: "2px solid #e2e8f0",
            borderRadius: 8,
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#FFCC00")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "0.65rem 1.4rem",
            background: loading ? "#94a3b8" : "#d40511",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: "1rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.15s",
          }}
        >
          {loading ? "Tracking…" : "Track"}
        </button>
      </form>

      {error && (
        <div style={{ padding: "1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, color: "#dc2626", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ padding: "1.25rem 1.5rem", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Tracking number
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", fontFamily: "monospace" }}>
                  {result.trackingNumber}
                </div>
              </div>
              <span style={{
                padding: "0.35rem 0.85rem",
                borderRadius: 99,
                background: statusColor,
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}>
                {statusLabel}
              </span>
            </div>

            {result.description && (
              <p style={{ margin: "0.75rem 0 0", fontSize: "0.9rem", color: "#475569" }}>{result.description}</p>
            )}

            {(result.origin || result.destination || result.estimatedDelivery) && (
              <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {result.origin && (
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>From</div>
                    <div style={{ fontSize: "0.85rem", color: "#334155", fontWeight: 500 }}>{result.origin}</div>
                  </div>
                )}
                {result.destination && (
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>To</div>
                    <div style={{ fontSize: "0.85rem", color: "#334155", fontWeight: 500 }}>{result.destination}</div>
                  </div>
                )}
                {result.estimatedDelivery && (
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Est. delivery</div>
                    <div style={{ fontSize: "0.85rem", color: "#334155", fontWeight: 500 }}>{formatDate(result.estimatedDelivery)}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Events */}
          {result.events.length > 0 ? (
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <h3 style={{ margin: "0 0 1rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
                Shipment Events
              </h3>
              <div style={{ position: "relative" }}>
                {result.events.map((event, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", paddingBottom: i < result.events.length - 1 ? "1.25rem" : 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: "50%",
                        background: i === 0 ? "#d40511" : "#cbd5e1",
                        flexShrink: 0, marginTop: 3,
                      }} />
                      {i < result.events.length - 1 && (
                        <div style={{ width: 2, flex: 1, background: "#e2e8f0", margin: "4px 0" }} />
                      )}
                    </div>
                    <div style={{ flex: 1, paddingBottom: 2 }}>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0f172a" }}>{event.description}</div>
                      {event.location && (
                        <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.1rem" }}>{event.location}</div>
                      )}
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.2rem" }}>{formatDate(event.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: "1.25rem 1.5rem", color: "#94a3b8", fontSize: "0.875rem" }}>
              No tracking events available yet.
            </div>
          )}

          {/* Footer */}
          <div style={{ padding: "1rem 1.5rem", background: "#f8fafc", borderTop: "1px solid #e2e8f0", textAlign: "right" }}>
            <a
              href={result.dhlUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.8rem", color: "#d40511", fontWeight: 600, textDecoration: "none" }}
            >
              View on DHL website →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState, useCallback } from 'react';
import { EnergyReading } from '../lib/types';

const POLL_INTERVAL_MS = 5000;

function MetricCard({ label, value, unit }: { label: string; value: string | number; unit: string }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardLabel}>{label}</div>
      <div style={styles.cardValue}>
        {typeof value === 'number' ? value.toFixed(2) : value}
        <span style={styles.cardUnit}> {unit}</span>
      </div>
    </div>
  );
}

export default function ShellyEMDashboard() {
  const [reading, setReading] = useState<EnergyReading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/energy/status');
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? res.statusText);
      }
      const data: EnergyReading = await res.json();
      data.timestamp = new Date(data.timestamp);
      setReading(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout');
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Shelly EM Gen4 — Energiemonitor</h2>
        {lastUpdated && (
          <span style={styles.updated}>
            Bijgewerkt: {lastUpdated.toLocaleTimeString('nl-NL')}
          </span>
        )}
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {reading && (
        <>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Totaal</h3>
            <div style={styles.grid}>
              <MetricCard label="Vermogen" value={reading.total_power} unit="W" />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Kanaal A</h3>
            <div style={styles.grid}>
              <MetricCard label="Vermogen" value={reading.channelA_power} unit="W" />
              <MetricCard label="Spanning" value={reading.channelA_voltage} unit="V" />
              <MetricCard label="Stroom" value={reading.channelA_current} unit="A" />
              <MetricCard label="Energie" value={(reading.channelA_energy / 1000).toFixed(3)} unit="kWh" />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Kanaal B</h3>
            <div style={styles.grid}>
              <MetricCard label="Vermogen" value={reading.channelB_power} unit="W" />
              <MetricCard label="Spanning" value={reading.channelB_voltage} unit="V" />
              <MetricCard label="Stroom" value={reading.channelB_current} unit="A" />
              <MetricCard label="Energie" value={(reading.channelB_energy / 1000).toFixed(3)} unit="kWh" />
            </div>
          </div>
        </>
      )}

      {!reading && !error && <div style={styles.loading}>Verbinden met Shelly EM Gen4...</div>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { fontFamily: 'sans-serif', padding: '1rem', maxWidth: 800 },
  header: { display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' },
  title: { margin: 0, fontSize: '1.4rem' },
  updated: { fontSize: '0.8rem', color: '#666' },
  error: { background: '#fee2e2', color: '#991b1b', padding: '0.75rem 1rem', borderRadius: 6, marginBottom: '1rem' },
  loading: { color: '#666' },
  section: { marginBottom: '1.5rem' },
  sectionTitle: { margin: '0 0 0.5rem', fontSize: '1rem', color: '#444' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' },
  card: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.75rem 1rem' },
  cardLabel: { fontSize: '0.75rem', color: '#64748b', marginBottom: 4 },
  cardValue: { fontSize: '1.5rem', fontWeight: 600, color: '#0f172a' },
  cardUnit: { fontSize: '0.85rem', fontWeight: 400, color: '#64748b' },
};

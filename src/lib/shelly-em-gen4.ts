import { ShellyDeviceInfo, ShellyEMGen4Status, EnergyReading } from './types';

const SHELLY_HOST = process.env.SHELLY_EM_GEN4_HOST ?? '';
const SHELLY_AUTH = process.env.SHELLY_EM_GEN4_AUTH ?? '';

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (SHELLY_AUTH) {
    headers['Authorization'] = `Basic ${Buffer.from(SHELLY_AUTH).toString('base64')}`;
  }
  return headers;
}

async function rpc<T>(method: string, params: Record<string, unknown> = {}): Promise<T> {
  const url = `http://${SHELLY_HOST}/rpc`;
  const body = JSON.stringify({ id: 1, method, params });
  const res = await fetch(url, { method: 'POST', headers: buildHeaders(), body });
  if (!res.ok) throw new Error(`Shelly RPC error ${res.status}: ${res.statusText}`);
  const json = await res.json();
  if (json.error) throw new Error(`Shelly error ${json.error.code}: ${json.error.message}`);
  return json.result as T;
}

export async function getDeviceInfo(): Promise<ShellyDeviceInfo> {
  return rpc<ShellyDeviceInfo>('Shelly.GetDeviceInfo');
}

export async function getEMStatus(): Promise<ShellyEMGen4Status> {
  return rpc<ShellyEMGen4Status>('EM.GetStatus', { id: 0 });
}

export async function resetEnergyCounters(): Promise<void> {
  await rpc('EM.ResetCounters', { id: 0 });
}

export function mapToEnergyReading(status: ShellyEMGen4Status): EnergyReading {
  return {
    timestamp: new Date(),
    channelA_power: status.a_act_power,
    channelB_power: status.b_act_power,
    total_power: status.total_act_power,
    channelA_energy: status.a_total_act_energy.total,
    channelB_energy: status.b_total_act_energy.total,
    channelA_voltage: status.a_voltage,
    channelB_voltage: status.b_voltage,
    channelA_current: status.a_current,
    channelB_current: status.b_current,
  };
}

export interface ShellyEMGen4Channel {
  id: number;
  voltage: number;        // V
  current: number;        // A
  act_power: number;      // W (active/real power)
  aprt_power: number;     // VA (apparent power)
  pf: number;             // power factor (-1..1)
  freq: number;           // Hz
  aenergy: {
    total: number;        // Wh total energy since last reset
    by_minute: number[];  // Wh per last 3 minutes
    minute_ts: number;    // unix timestamp of last minute
  };
  ret_aenergy: {
    total: number;        // Wh returned energy
    by_minute: number[];
    minute_ts: number;
  };
}

export interface ShellyEMGen4Status {
  id: number;
  a_act_power: number;    // total active power (sum channels)
  a_aprt_power: number;
  a_current: number;
  a_freq: number;
  a_pf: number;
  a_voltage: number;
  b_act_power: number;
  b_aprt_power: number;
  b_current: number;
  b_pf: number;
  b_voltage: number;
  total_act_power: number;
  total_aprt_power: number;
  total_current: number;
  a_total_act_energy: { total: number };
  b_total_act_energy: { total: number };
  a_total_act_ret_energy: { total: number };
  b_total_act_ret_energy: { total: number };
}

export interface ShellyDeviceInfo {
  id: string;
  mac: string;
  model: string;
  gen: number;
  fw_id: string;
  ver: string;
  app: string;
  auth_en: boolean;
}

export interface EnergyReading {
  timestamp: Date;
  channelA_power: number;
  channelB_power: number;
  total_power: number;
  channelA_energy: number;
  channelB_energy: number;
  channelA_voltage: number;
  channelB_voltage: number;
  channelA_current: number;
  channelB_current: number;
}

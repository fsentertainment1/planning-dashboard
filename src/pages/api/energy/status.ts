import type { NextApiRequest, NextApiResponse } from 'next';
import { getEMStatus, mapToEnergyReading } from '../../../lib/shelly-em-gen4';
import { EnergyReading } from '../../../lib/types';

type ApiError = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnergyReading | ApiError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const status = await getEMStatus();
    const reading = mapToEnergyReading(status);
    res.status(200).json(reading);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(502).json({ error: `Could not reach Shelly EM Gen4: ${message}` });
  }
}

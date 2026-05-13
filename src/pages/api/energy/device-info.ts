import type { NextApiRequest, NextApiResponse } from 'next';
import { getDeviceInfo } from '../../../lib/shelly-em-gen4';
import { ShellyDeviceInfo } from '../../../lib/types';

type ApiError = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShellyDeviceInfo | ApiError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const info = await getDeviceInfo();
    res.status(200).json(info);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(502).json({ error: `Could not reach Shelly EM Gen4: ${message}` });
  }
}

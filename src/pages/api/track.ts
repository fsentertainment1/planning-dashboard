import type { NextApiRequest, NextApiResponse } from "next";
import type { TrackingResult, TrackingApiResponse } from "@/lib/types";

type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrackingResult | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { trackingNumber } = req.query;
  if (!trackingNumber || typeof trackingNumber !== "string") {
    return res.status(400).json({ error: "Tracking number is required" });
  }

  const id = trackingNumber.trim().replace(/\s+/g, "");
  const dhlUrl = `https://www.dhl.com/nl-en/home/tracking.html?tracking-id=${id}&submit=1`;

  const apiKey = process.env.DHL_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      trackingNumber: id,
      status: "UNKNOWN",
      statusCode: "NO_API_KEY",
      description: "Configure DHL_API_KEY to enable live tracking.",
      events: [],
      dhlUrl,
    });
  }

  try {
    const response = await fetch(
      `https://api.dhl.com/track/shipments?trackingNumber=${encodeURIComponent(id)}`,
      {
        headers: {
          "DHL-API-Key": apiKey,
          Accept: "application/json",
        },
      }
    );

    const data: TrackingApiResponse = await response.json();

    if (!response.ok || !data.shipments?.length) {
      return res.status(200).json({
        trackingNumber: id,
        status: "NOT_FOUND",
        statusCode: "NOT_FOUND",
        description: data.title ?? "Shipment not found",
        events: [],
        dhlUrl,
      });
    }

    const shipment = data.shipments[0];
    const origin = [
      shipment.origin?.address?.addressLocality,
      shipment.origin?.address?.countryCode,
    ]
      .filter(Boolean)
      .join(", ");
    const destination = [
      shipment.destination?.address?.addressLocality,
      shipment.destination?.address?.countryCode,
    ]
      .filter(Boolean)
      .join(", ");

    return res.status(200).json({
      trackingNumber: id,
      status: shipment.status.status,
      statusCode: shipment.status.status,
      description: shipment.status.description,
      origin: origin || undefined,
      destination: destination || undefined,
      estimatedDelivery: shipment.estimatedTimeOfDelivery ?? undefined,
      events: (shipment.events ?? []).map((e) => ({
        timestamp: e.timestamp,
        location: [
          e.location?.address?.addressLocality,
          e.location?.address?.countryCode,
        ]
          .filter(Boolean)
          .join(", "),
        description: e.description,
        status: e.status,
      })),
      dhlUrl,
    });
  } catch {
    return res.status(500).json({ error: "Failed to contact DHL API" });
  }
}

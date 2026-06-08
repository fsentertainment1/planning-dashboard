export interface TrackingEvent {
  timestamp: string;
  location: string;
  description: string;
  status: string;
}

export interface TrackingResult {
  trackingNumber: string;
  status: string;
  statusCode: string;
  description: string;
  origin?: string;
  destination?: string;
  estimatedDelivery?: string;
  events: TrackingEvent[];
  dhlUrl: string;
}

export interface TrackingApiResponse {
  shipments?: Array<{
    id: string;
    service: string;
    origin?: { address?: { addressLocality?: string; countryCode?: string } };
    destination?: { address?: { addressLocality?: string; countryCode?: string } };
    status: {
      timestamp: string;
      location?: { address?: { addressLocality?: string } };
      status: string;
      description: string;
      remark?: string;
    };
    estimatedTimeOfDelivery?: string;
    events?: Array<{
      timestamp: string;
      location?: { address?: { addressLocality?: string; countryCode?: string } };
      status: string;
      description: string;
    }>;
  }>;
  title?: string;
  status?: number;
}

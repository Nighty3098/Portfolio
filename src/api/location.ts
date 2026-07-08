export interface LocationInfo {
  country: string;
}

const APIS = [
  "https://ipinfo.io/json",
  "https://ip-api.com/json/?fields=countryCode",
  "https://api.country.is/",
];

export async function detectLocation(): Promise<LocationInfo> {
  for (const url of APIS) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const data = await res.json();

      if (data.country) return { country: data.country };
      if (data.countryCode) return { country: data.countryCode };
    } catch {
      continue;
    }
  }
  throw new Error("All location APIs failed");
}

import { ForecastPoint, StormGlass } from '@src/clients/stormGlass';

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface Beach {
  lat: number;
  lng: number;
  name: string;
  position: BeachPosition;
  user: string;
}

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}

export class Forecast {
  constructor(protected stormglass = new StormGlass()) {}

  public async processForecastForBeaches(
    beaches: Beach[]
  ): Promise<BeachForecast[]> {
    const pointsWithCorrectSources: BeachForecast[] = [];

    for (const beach of beaches) {
      const points = await this.stormglass.fetchPoints(beach.lat, beach.lng);
      const enrichedBeachData = points.map((e) => ({
        ...{
          lat: beach.lat,
          lng: beach.lng,
          name: beach.name,
          position: beach.position,
          rating: 1,
        },
        ...e,
      }));
      pointsWithCorrectSources.push(...enrichedBeachData);
    }

    return pointsWithCorrectSources;
  }
}

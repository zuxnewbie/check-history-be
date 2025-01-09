import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class LeagueExpV4Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getLeagueExp(
    region: string,
    queue: string,
    tier: string,
    division: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/league-exp/v4/entries/${queue}/${tier}/${division}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}

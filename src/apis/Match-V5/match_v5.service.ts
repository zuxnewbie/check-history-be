import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class MatchV5Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}
  async getMatchByPuuid(region: string, puuid: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getMatchByMatchId(region: string, matchId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getMatchTimeLine(region: string, matchId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}

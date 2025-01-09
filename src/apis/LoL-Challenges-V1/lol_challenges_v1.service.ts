import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class LoLChallengesV1Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getConfig(region: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/challenges/v1/challenges/config?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getPercentiles(region: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/challenges/v1/challenges/percentiles?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getChallengeConfig(region: string, challengeId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/challenges/v1/challenges/${challengeId}/config?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getLeaderBoard(
    region: string,
    challengeId: string,
    level: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/challenges/v1/challenges/${challengeId}/leaderboards/by-level/${level}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getMap(region: string, challengeId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/challenges/v1/challenges/${challengeId}/percentiles?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getPlyerData(region: string, puuid: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/challenges/v1/player-data/${puuid}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}

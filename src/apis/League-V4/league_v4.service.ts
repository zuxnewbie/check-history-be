import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class LeagueV4Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getLeagueChallenger(region: string, queue: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getLeagueEntriesBySummonerId(
    region: string,
    encryptedSummonerId: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getLeagueAllEntries(
    region: string,
    queue: string,
    tier: string,
    division: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/${queue}/${tier}/${division}}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getLeagueGrandmaster(region: string, queue: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/${queue}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getLeagueByID(region: string, leagueId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/leagues/${leagueId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getLeagueMaster(region: string, queue: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/masterleagues/by-queue/${queue}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}

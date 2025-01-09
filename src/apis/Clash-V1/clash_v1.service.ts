import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class ClashV1Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}
  async getPlayer(region: string, puuid: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/clash/v1/players/by-puuid/${puuid}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getPlayerBySummoner(region: string, summonerId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/clash/v1/players/by-summoner/${summonerId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getTeam(region: string, teamId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/clash/v1/teams/${teamId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getTournaments(region: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/clash/v1/tournaments?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getTournamentsByTeam(region: string, teamId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/clash/v1/tournaments/by-team/${teamId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getTournamentsById(region: string, tournamentId: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/clash/v1/tournaments/${tournamentId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}
